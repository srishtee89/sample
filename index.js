let title1 = document.createElement('h2');
title1.textContent = 'My Tasks';

let title2 = document.createElement('h2');
title2.textContent = 'Create Task';

let s1 = document.createElement('div');
s1.className = 'screen max-w-[500px] bg-blue-400 p-5 rounded-lg shadow-md';

let s2 = document.createElement('div');
s2.className = 'screen hidden';

let addBtn = document.createElement('button');
addBtn.innerText = 'Add';
addBtn.type = 'button';
addBtn.className = 'px-3 py-2 border-0 bg-green-600 text-white rounded cursor-pointer';

let hideshowBtn = document.createElement('button');
hideshowBtn.innerText = 'Hide';
hideshowBtn.type = 'button';
hideshowBtn.className = 'px-3 py-2 border-0 bg-yellow-600 text-white rounded cursor-pointer ml-2';

let tasksContainer = document.createElement('div');
tasksContainer.className = 'mt-3 space-y-2';

s1.appendChild(title1);
s1.appendChild(addBtn);
s1.appendChild(hideshowBtn);
s1.appendChild(tasksContainer);
document.body.appendChild(s1);

let userInput = document.createElement('input');
userInput.className = 'p-2 bg-white border border-gray-300 rounded';
userInput.placeholder = 'enter task';

let dinput = document.createElement('input');
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

const STORAGE_KEY = 'tasks';
let tasks = [];
let editingIndex = null;

try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
} catch (error) {
    tasks = [];
}

function showForm() {
    s1.classList.add('hidden');
    s2.classList.remove('hidden');
    s2.className = 'bg-pink-300 p-5 rounded-lg shadow-md';
}

function showList() {
    s2.classList.add('hidden');
    s1.classList.remove('hidden');
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function setupReadMore(desc, rm) {
    let isExpanded = false;

    const updateButtonState = () => {
        const needsClamp = desc.scrollHeight > desc.clientHeight;
        rm.style.display = needsClamp ? 'inline-block' : 'none';

        if (!needsClamp) {
            desc.classList.remove('line-clamp-3');
            isExpanded = false;
            rm.innerText = 'Read More';
            return;
        }

        desc.classList.toggle('line-clamp-3', !isExpanded);
        rm.innerText = isExpanded ? 'Read Less' : 'Read More';
    };

    rm.addEventListener('click', () => {
        isExpanded = !isExpanded;
        updateButtonState();
    });

    requestAnimationFrame(updateButtonState);
    window.addEventListener('resize', updateButtonState);
}

hideshowBtn.addEventListener('click', () => {
    const isHidden = tasksContainer.style.display === 'none';
    tasksContainer.style.display = isHidden ? 'block' : 'none';
    hideshowBtn.innerText = isHidden ? 'Hide' : 'Show';
});

function rebuildTaskList() {
    tasksContainer.querySelectorAll('.text-item').forEach((box) => box.remove());
    tasks.forEach((task, index) => {
        let newBox = document.createElement('div');
        newBox.classList.add('text-item');
        newBox.dataset.index = index;

        let para = document.createElement('span');
        para.innerText = task.title;
        para.className = 'm-1 p-1 font-semibold';

        let desc = document.createElement('span');
        desc.innerText = task.description;
        desc.className = 'm-1 p-1 text-sm line-clamp-3';

        let taskbox = document.createElement('div');
        taskbox.className = 'flex flex-col';

        let date = document.createElement('p');
        date.innerText = new Date().toLocaleString();

        let rm = document.createElement('button');
        rm.innerText = 'Read More';
        rm.className = 'text-blue-400 underline decoration-blue-400';

        taskbox.appendChild(para);
        taskbox.appendChild(desc);
        taskbox.appendChild(rm);
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
            tasks.splice(index, 1);
            saveTasks();
            rebuildTaskList();
        });

        donebtn.addEventListener('click', () => {
            taskbox.classList.toggle('line-through');
        });

        editbtn.addEventListener('click', () => {
            title2.textContent = 'Edit Task';
            adbtn.textContent = 'Save';
            userInput.value = task.title;
            dinput.value = task.description;
            editingIndex = index;
            showForm();
        });

        setupReadMore(desc, rm);
        tasksContainer.appendChild(newBox);
    });
}

function resetForm() {
    userInput.value = '';
    dinput.value = '';
    title2.textContent = 'Create Task';
    adbtn.textContent = 'Add';
    editingIndex = null;
}

addBtn.addEventListener('click', () => {
    resetForm();
    showForm();
});

rebuildTaskList();

adbtn.addEventListener('click', () => {
    let data = userInput.value.trim();
    let dataD = dinput.value.trim();

    if (data === '' || dataD === '') {
        alert('Please enter some text!');
        return;
    }

    if (editingIndex !== null) {
        tasks[editingIndex] = { title: data, description: dataD };
    } else {
        tasks.push({ title: data, description: dataD });
    }

    saveTasks();
    rebuildTaskList();
    resetForm();
    showList();
});
