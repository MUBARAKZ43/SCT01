// Global state for tasks and lists
let tasks = {};
let currentList = "default";

// Initialize with a default list
tasks[currentList] = [];

// DOM elements
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");
const listForm = document.getElementById("list-form");
const listName = document.getElementById("list-name");
const listSelector = document.getElementById("list-selector");

// Utility to render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks[currentList].forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.title} ${task.date ? `- ${task.date}` : ""}</span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Utility to render lists
function renderLists() {
    listSelector.innerHTML = "";
    for (const list in tasks) {
        const li = document.createElement("li");
        li.className = `list-item ${list === currentList ? "active" : ""}`;
        li.dataset.list = list;
        li.textContent = list.charAt(0).toUpperCase() + list.slice(1);
        li.onclick = () => selectList(list);
        listSelector.appendChild(li);
    }
}

// Task actions
function toggleTask(index) {
    tasks[currentList][index].completed = !tasks[currentList][index].completed;
    renderTasks();
}

function editTask(index) {
    const task = tasks[currentList][index];
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDate = prompt("Edit Task Date:", task.date || "");
    if (newTitle !== null) task.title = newTitle;
    if (newDate !== null) task.date = newDate;
    renderTasks();
}

function deleteTask(index) {
    tasks[currentList].splice(index, 1);
    renderTasks();
}

// Add task
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks[currentList].push({
        title: taskTitle.value,
        date: taskDate.value,
        completed: false,
    });
    taskTitle.value = "";
    taskDate.value = "";
    renderTasks();
});

// Add list
listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newList = listName.value.trim().toLowerCase();
    if (newList && !tasks[newList]) {
        tasks[newList] = [];
        listName.value = "";
        renderLists();
        selectList(newList);
    }
});

// Select list
function selectList(list) {
    currentList = list;
    renderTasks();
    renderLists();
}

// Initial render
renderLists();
renderTasks();
