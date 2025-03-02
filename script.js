        let tasks = [];
        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('tasks')) {
                tasks = JSON.parse(localStorage.getItem('tasks'));
                renderTasks();
                            }
                            document.getElementById('add-task-btn').addEventListener('click', addTask);
                            document.getElementById('task-list').addEventListener('click', (e) => {
                                if (e.target.tagName === 'BUTTON') {
                                    const index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
                                    if (e.target.textContent === 'Edit') {
                                        editTask(index);
                                    } else if (e.target.textContent === 'Delete') {
                                        deleteTask(index);
                                    }
                                }
                            });

                            window.addEventListener('beforeunload', () => {
                                localStorage.setItem('tasks', JSON.stringify(tasks));
                            });

                            // Advanced feature: Filter tasks by status
                            document.getElementById('filter-status').addEventListener('change', (e) => {
                                const filterValue = e.target.value;
                                const filteredTasks = tasks.filter(task => task.status === filterValue || filterValue === 'all');
                                renderFilteredTasks(filteredTasks);
                            });

                            function renderFilteredTasks(filteredTasks) {
                                const taskList = document.getElementById('task-list');
                                taskList.innerHTML = '';
                                filteredTasks.forEach((task, index) => {
                                    const taskItem = document.createElement('li');
                                    taskItem.className = 'task-item';
                                    taskItem.innerHTML = `
                                        <input type="text" value="${task.taskText}" readonly>
                                        <input type="text" value="${task.date}" readonly>
                                        <input type="text" value="${task.author}" readonly>
                                        <input type="text" value="${task.role}" readonly>
                                        <input type="text" value="${task.responsible}" readonly>
                                        <input type="text" value="${task.status}" readonly>
                                        <button onclick="editTask(${index})">Edit</button>
                                        <button onclick="deleteTask(${index})">Delete</button>
                                    `;
                                    taskList.appendChild(taskItem);
                                });
                            }
        function addTask() {
            const taskInput = document.getElementById('new-task');
            const taskDate = document.getElementById('task-date');
            const taskAuthor = document.getElementById('task-author');
            const taskRole = document.getElementById('task-role');
            const taskResponsible = document.getElementById('task-responsible');
            const taskStatus = document.getElementById('task-status');

            const taskText = taskInput.value.trim();
            const date = taskDate.value;
            const author = taskAuthor.value.trim();
            const role = taskRole.value.trim();
            const responsible = taskResponsible.value.trim();
            const status = taskStatus.value.trim();

            if (taskText && date && author && role && responsible && status) {
                tasks.push({ taskText, date, author, role, responsible, status });
                taskInput.value = '';
                taskDate.value = '';
                taskAuthor.value = '';
                taskRole.value = '';
                taskResponsible.value = '';
                taskStatus.value = '';
                renderTasks();
            } else {
                alert('Please fill in all fields.');
            }
        }        document.getElementById('add-task-btn').addEventListener('click', addTask);       function editTask(index) {
            const task = tasks[index];
            const newTaskText = prompt('Edit task:', task.taskText);
            const newDate = prompt('Edit date:', task.date);
            const newAuthor = prompt('Edit author:', task.author);
            const newRole = prompt('Edit role:', task.role);
            const newResponsible = prompt('Edit responsible:', task.responsible);
            const newStatus = prompt('Edit status:', task.status);

            if (newTaskText !== null && newDate !== null && newAuthor !== null && newRole !== null && newResponsible !== null && newStatus !== null) {
                tasks[index] = {
                    taskText: newTaskText.trim(),
                    date: newDate,
                    author: newAuthor.trim(),
                    role: newRole.trim(),
                    responsible: newResponsible.trim(),
                    status: newStatus.trim()
                };
                renderTasks();
            }
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
        }

        function renderTasks() {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.innerHTML = `
                    <input type="text" value="${task.taskText}" readonly>
                    <input type="text" value="${task.date}" readonly>
                    <input type="text" value="${task.author}" readonly>
                    <input type="text" value="${task.role}" readonly>
                    <input type="text" value="${task.responsible}" readonly>
                    <input type="text" value="${task.status}" readonly>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(taskItem);
            });
        }