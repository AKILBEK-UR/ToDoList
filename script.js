const activityInput = document.querySelector('.activity__input');
const categoryInputs = document.querySelectorAll('input[name="category"]');
const todoList = document.getElementById('todo-list');
// Initialize an array to store tasks
let tasks = [];
// Function to create a new task object
const createTask = (name, category) => {
    return {
        id: Date.now().toString(),
        name,
        category,
        completed: false
    };
};

// Function to render tasks
const renderTasks = () => {
    // Clear the todoList element before rendering
    todoList.innerHTML = '';
    // Render each task
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-name ${task.completed ? 'completed' : ''}">${task.name}</span>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>`;
        todoList.appendChild(taskElement);
        // Add event listeners for delete and edit buttons
        const deleteBtn = taskElement.querySelector('.delete-btn');
        const editBtn = taskElement.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        editBtn.addEventListener('click', () => editTask(task.id));
    });
};

// Function to add a task
const addTask = () => {
    const name = activityInput.value.trim();
    const category = [...categoryInputs].find(input => input.checked)?.value;
    if (name && category) {
        const task = createTask(name, category);
        tasks.push(task);
        renderTasks();
        activityInput.value = ''; // Clear the input field
    }
};
// Function to delete a task
const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
};
// Function to edit a task
const editTask = (taskId) => {
    const newName = prompt('Enter new name for the task:');
    if (newName !== null) {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].name = newName;
            renderTasks();
        }
    }
};
// Function to toggle task completion
const toggleTaskCompletion = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
};
// Event listeners
document.querySelector('input[type="submit"]').addEventListener('click', addTask);
todoList.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        const taskId = event.target.parentElement.dataset.taskId;
        toggleTaskCompletion(taskId);
    }
});
// Initial rendering
renderTasks();
