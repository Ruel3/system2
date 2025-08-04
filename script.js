// Redirect if not logged in
if (localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const deadline = document.getElementById('deadline').value;
  const subject = document.getElementById('subject').value;
  const priority = document.getElementById('priority').value;

  const task = {
    id: Date.now(),
    title,
    deadline,
    subject,
    priority
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
  taskForm.reset();
});

function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'task-info';
    info.innerHTML = `<strong>${task.title}</strong><br>
      📅 ${task.deadline} | 📘 ${task.subject} | ⚠️ ${task.priority}`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);

    checkReminder(task);
  });
}

