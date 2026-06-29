let title1 = document.createElement('h2');
title1.textContent = 'My Tasks';

let title2 = document.createElement('h2');
title2.textContent = 'Create Task';

let s1 = document.createElement('div');
s1.className = 'screen max-w-[500px] bg-blue-400 p-5 rounded-lg shadow-md';

let s2 = document.createElement('div');
s2.className = 'screen hidden';

let msg = document.createElement('div');
msg.className = 'text-red-500 mb-2';
msg.innerText = 'there is no task';
msg.id = 'msg';

let taskcontainer = document.createElement("div");

let searchBox = document.createElement("input");
searchBox.placeholder = "type to search";
searchBox.classList = "bg-blue-100 border-1 rounded-sm";

let searchBtn = document.createElement("button");
searchBtn.innerText = "🔍";
searchBtn.classList = "bg-blue-300 border-1 rounded-sm";
searchBtn.addEventListener("click", () => {
  let count = taskcontainer.childElementCount;
  console.log(count);
  let searchValue = searchBox.value;
  if (searchValue == "") {
    alert("enter a item to search");
    return;
  }

taskcontainer.innerHTML = "";
  let svalue = searchValue.toLowerCase().trim();
  for (let i = 0; i < tasks.length; i++) {
    let taskName = tasks[i].taskName.toLowerCase().trim();
    if (taskName == svalue || taskName.includes(svalue)) {
      console.log("task found");
      createTask(tasks[i],false);
    }
  }
  if (taskcontainer.childElementCount == 0) {
    taskcontainer.appendChild(msg);
  }
});

let tasks = retrieveTasksFromLocalStorage() ;
console.log(tasks);
if (tasks==null) {
    tasks = [];
    console.log("no tasks found in local storage");
} else {
   console.log("tasks retrieved from local storage");
   buildtasks();
}
function buildtasks(){
     for (let i = 0; i < tasks.length; i++) {
        createTask(tasks[i],false);
    }
}

addBtn = document.createElement('button');
addBtn.innerText = 'Add';
addBtn.type = 'button';
addBtn.className = 'px-3 py-2 border-0 bg-green-600 text-white rounded cursor-pointer';

let hideshowBtn = document.createElement('button');
hideshowBtn.innerText = 'Hide';
hideshowBtn.type = 'button';
hideshowBtn.className = 'px-3 py-2 border-0 bg-yellow-600 text-white rounded cursor-pointer ml-2';

s1.appendChild(title1);
s1.appendChild(addBtn);
s1.appendChild(hideshowBtn);
s1.appendChild(searchBox);
s1.appendChild(searchBtn);
s1.appendChild(taskcontainer);
document.body.appendChild(s1);

addBtn.addEventListener('click',() => {
    s1.classList.add('hidden');
    s2.classList.remove('hidden');
    s2.className = " bg-pink-300 p-5 rounded-lg shadow-md";
});    

hideshowBtn.addEventListener('click', () => {
    let isHidden = taskcontainer.style.display === 'none';
    if (isHidden) {
      taskcontainer.style.display = 'block';
      hideshowBtn.innerText = 'Hide';
    } else {
      taskcontainer.style.display = 'none';
      hideshowBtn.innerText = 'Show';
    }
    if (tasks.length == 0) {
    if (taskcontainer.contains(msg) == false) {
            taskcontainer.appendChild(msg);
          }
          taskcontainer.appendChild(msg);
        } else {
          if (taskcontainer.contains(msg)) {
            taskcontainer.removeChild(msg);
          }
        }
});

let userInput = document.createElement('input');
userInput.id = "input-data";
userInput.className = 'p-2 bg-white border border-gray-300 rounded';
userInput.placeholder = 'enter task';

let dinput = document.createElement('input');
dinput.id = "description-data";
dinput.className = 'p-2 bg-white border border-gray-300 rounded';
dinput.placeholder = 'enter task description';

let adbtn = document.createElement('button');
adbtn.innerText = 'Add';
adbtn.className = 'px-3 py-2 border-0 bg-green-600 text-white rounded cursor-pointer';

s2.appendChild(title2);
s2.appendChild(userInput);
s2.appendChild(dinput);
s2.appendChild(adbtn);
document.body.appendChild(s2);

adbtn.addEventListener("click", () => {
  let task = {};
  task["status"] = false;
  task["timeStamp"] = new Date().toLocaleString();
  let id = new Date().getTime();
  task["taskId"] = id;
  task["taskName"] = getInput();
  task["description"] = getDescription();
  if (task.taskName == "" || task.description == "") {
    alert("enter informations to continue");
    return;
  }
  createTask(task, true);
  if (hideshowBtn.innerText == "Show") {
    hideshowBtn.innerText = "Hide";
  } else {
    hideshowBtn.innerText = "Show";
  }
  tasks.push(task);
  tasks.sort((task1, task2) => {
    return task2.taskId - task1.taskId;
  });
  saveTaskstoLocalStorage(tasks);
  s2.classList.add('hidden');
  s1.classList.remove('hidden');
});

function createTask(task, flag) {
    let newBox = document.createElement('div');
    newBox.classList.add('text-item');

    let mydescriptionSize = task.description.length;

    let para = document.createElement('h2');
    para.innerText = task.taskName;
    para.className = 'm-1 p-1 font-semibold';

    let desc = document.createElement('span');
    desc.innerText = task.description;
    desc.className = 'm-1 p-1 text-sm line-clamp-3';

    let taskbox = document.createElement('div');
    taskbox.className = 'flex flex-col';

    let date = document.createElement('p');
    let todayDate = task.timeStamp;
    date.innerText = todayDate;

    let rm = document.createElement('button');
    if (mydescriptionSize > 100) {
        rm.innerText = 'Read More';
        rm.className = 'text-blue-400 underline decoration-blue-400';
        rm.addEventListener('click', () => {
            if (rm.innerText == "Read More") {
                rm.innerText = "Read Less";
            } else {
                rm.innerText = "Read More";
            }
            desc.classList.toggle("truncate");
        });
            
    }
        if (tasks.length == 0) {
          if (newBox.contains(msg) == false) {
            newBox.appendChild(msg);
          }
          newBox.appendChild(msg);
        } else {
          if (newBox.contains(msg)) {
            newBox.removeChild(msg);
          }
        }
        // newBox.appendChild(searchBox);
        // newBox.appendChild(searchBtn);
        taskbox.appendChild(para);
        taskbox.appendChild(desc);
        newBox.appendChild(taskbox);
        newBox.appendChild(date);

        let removebtn = document.createElement('button');
        removebtn.innerText = '🗑️';
        let donebtn = document.createElement('button');
        donebtn.innerText = '✅';
        let editbtn = document.createElement('button');
        editbtn.innerText = '✏️';

        newBox.appendChild(removebtn);
        newBox.appendChild(donebtn);
        newBox.appendChild(editbtn);

        removebtn.addEventListener('click', () => {
          console.log(task.taskId);
          let newArray = tasks.filter((t) => t.taskId != task.taskId);
          saveTaskstoLocalStorage(newArray);
          newBox.remove();
        });

        donebtn.addEventListener('click', () => {
            console.log(task.taskId);
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskId == task.taskId) {
              console.log("id matched", tasks[i].status);
              if (tasks[i].status == true) {
                tasks[i].status = false;
              } else {
                tasks[i].status = true;
              }
            } 
          }
          saveTaskstoLocalStorage(tasks);
          // newBox.classList.toggle("bg-yellow-500");
          taskbox.classList.toggle('line-through');
          if (donebtn.innerText == "✅") {
            donebtn.innerText = "❌";
          } else if (donebtn.innerText == "❌") {
            donebtn.innerText = "✅";
          }
          console.log("done clicked");
        });

        editbtn.addEventListener('click', () => {
          console.log(task.taskId);
          saveButton.style.display = "block";
          editbtn.style.display = "none";
          newBox.childNodes[0].remove();
          newBox.childNodes[0].remove();
          newBox.childNodes[0].remove();
          let newInput = document.createElement("input");
          newInput.value = task.taskName;
          newInput.classList = "bg-yellow-200";
          let newDescription = document.createElement("textarea");
          newDescription.value = task.description;
          newDescription.classList = "bg-yellow-300";
          newBox.prepend(newDescription);
          newBox.prepend(newInput);
          saveTaskstoLocalStorage(tasks);
        });

        let saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.classList = "bg-black text-white border-2 m-1 rounded-xl";
        saveButton.style.display = "none";
        saveButton.addEventListener("click", () => {
          console.log(task.taskId);
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].taskId == task.taskId) {
              console.log("id matched", tasks[i].status);
              if (tasks[i].status == true) {
                tasks[i].status = false;
              } else {
                tasks[i].status = true;
              }
            }
          }
          saveTaskstoLocalStorage(tasks);
        });
        if (flag) {
          taskcontainer.prepend(newBox);
        } else taskcontainer.appendChild(newBox);
}

function getInput() {
  let MYInput = document.getElementById("input-data");
  let result = MYInput.value.trim();
  MYInput.value = "";
  return result;
}
function getDescription() {
  let MYDESC = document.getElementById("description-data");
  let result = MYDESC.value.trim();
  MYDESC.value = "";
  return result;
}

function saveTaskstoLocalStorage(tasks) {
    let tasksstring = JSON.stringify(tasks);
    localStorage.setItem("task", tasksstring);
}

function retrieveTasksFromLocalStorage() {
    let tasksstring = localStorage.getItem("task");  
    let tasksarray = JSON.parse(tasksstring);
    return tasksarray;
}
