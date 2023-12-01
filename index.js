var container = document.getElementById('app');
container.className = 'container';

var title = createNode('h1', 'Todo App', { className: 'title' });
var addButton = createNode('button', 'Add', { type: 'button', className: 'add-button' });
var input = createNode('input', '', { type: 'text', placeholder: 'New task...', className: 'todo-input' });


addButton.addEventListener('click', function() {
    var taskDescription = input.value.trim();
    if (taskDescription !== '') {
        tasks = addTask(tasks, taskDescription);
        updateTaskList();
        input.value = ''; // Limpiar el campo de entrada después de agregar la tarea
    }
});

appendChildren(container, [title, input, addButton]);

var tasks = [];

function createNode(type, child, attrs) {
    var node = document.createElement(type);
    if (attrs) {
        Object.keys(attrs).forEach(function(attr) {
            node[attr] = attrs[attr];
        });
    }

    if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
    } else {
        node.appendChild(child);
    }

    return node;
}

function appendChildren(node, children) {
    var documentFragment = document.createDocumentFragment();
    children.forEach(function(child) {
        documentFragment.appendChild(child);
    });

    node.appendChild(documentFragment);
}

function addTask(tasks, description, isCompleted = false) {
    var newTasks = tasks.concat({
        description: description,
        isCompleted: isCompleted
    });

    return newTasks;
}

function updateTaskList() {
    // Limpiar el contenedor antes de volver a dibujar las tareas
    container.innerHTML = '';

    appendChildren(container, [title, input, addButton]);

    tasks.forEach(function(task, index) {
        var taskElement = createNode('div', task.description, { className: task.isCompleted ? 'completed-task' : '' });
        taskElement.addEventListener('click', function() {
            // Agregar lógica de marcado/completado aquí usando la función toggleTaskCompleted
            tasks = toggleTaskCompleted(tasks, index);
            updateTaskList();
        });

        var deleteButton = createNode('button', 'Delete', { type: 'button', className: 'delete-button' });
        deleteButton.addEventListener('click', function(event) {
            // Agregar lógica de eliminación aquí usando la función deleteTask
            tasks = deleteTask(tasks, index);
            updateTaskList();
            event.stopPropagation(); // Evitar que el evento de clic se propague al elemento padre
        });

        var updateButton = createNode('button', 'Update', { type: 'button', className: 'update-button' });
        updateButton.addEventListener('click', function() {
            var updatedText = prompt('Enter updated text:');
            if (updatedText !== null) {
                tasks = updateTaskText(tasks, updatedText);
                updateTaskList();
            }
        });
        

        appendChildren(taskElement, [updateButton]);
        appendChildren(taskElement, [deleteButton]);
        appendChildren(container, [taskElement]);
    });
}


function updateTaskText(tasks, updatedText) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    var index = prompt('Enter the index of the task to update:');
    
    if (index !== null && index >= 0 && index < newTasks.length) {
        newTasks[index].description = updatedText;
    } else {
        alert('Invalid index. Task not updated.');
    }

    return newTasks;
}


function toggleTaskCompleted(tasks, index) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    return newTasks;
}

function deleteTask(tasks, index) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    newTasks.splice(index, 1);
    return newTasks;
}
