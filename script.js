// =============================
// GET TASKS FROM LOCAL STORAGE
// =============================
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// =============================
// SAVE TASKS TO LOCAL STORAGE
// =============================
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =============================
// ADD TASK
// =============================
function addTask() {
    const input = document.getElementById("taskInput");
    if (!input) return;

    const text = input.value.trim();
    if (text === "") {
        alert("Please enter a task");
        return;
    }

    let tasks = getTasks();

    tasks.push({
        text: text,
        time: new Date().toLocaleString(),
        completed: false
    });

    saveTasks(tasks);
    input.value = "";
    alert("Task added!");
}

// =============================
// LOAD HISTORY PAGE
// =============================
function loadHistory() {
    const list = document.getElementById("historyList");
    const empty = document.getElementById("emptyMsg");

    if (!list) return;

    let tasks = getTasks();
    list.innerHTML = "";

    if (tasks.length === 0) {
        if (empty) empty.style.display = "block";
        return;
    }

    if (empty) empty.style.display = "none";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-row">
                <div>
                    <strong style="${task.completed ? 'text-decoration: line-through; opacity:0.6;' : ''}">
                        ${task.text}
                    </strong><br>
                    <small>${task.time}</small>
                </div>

                <button class="action-btn complete-btn" onclick="toggleComplete(${index})">
                    ✔
                </button>

                <button class="action-btn delete-btn" onclick="deleteTask(${index})">
                    ❌
                </button>
            </div>
        `;

        list.appendChild(li);
    });
}

// =============================
// TOGGLE COMPLETE
// =============================
function toggleComplete(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadHistory();
    loadHomeTasks();   // update home page also
}

// =============================
// DELETE TASK
// =============================
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadHistory();
    loadHomeTasks();   // update home page also
}

// =============================
// LOAD HOME PAGE TASKS
// =============================
function loadHomeTasks() {
    const list = document.getElementById("homeTaskList");
    if (!list) return;

    let tasks = getTasks();
    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = "<li>No tasks yet</li>";
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.textContent = task.completed ? "✔ " + task.text : task.text;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        list.appendChild(li);
    });
}

// =============================
// AUTO LOAD WHEN PAGE OPENS
// =============================
document.addEventListener("DOMContentLoaded", function () {
    loadHistory();
    loadHomeTasks();
});
