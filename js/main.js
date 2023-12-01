var container = document.getElementById('app');
container.className = 'container';


const classes = {
    title: 'title',
    addButton: 'add-button',
    deleteButton: 'delete-button',
    updateButton: 'update-button',
    completedTask: 'completed-task',
    todoInput: 'todo-input'
};

    title = createNode('h1', 'Todo App', { className: classes.title });
    addButton =  createNode('button', 'Add', { type: 'button', className: classes.addButton });
    input = createNode('input', '', { type: 'text', placeholder: 'New task...', className: classes.todoInput });


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
        const taskElement = createNode('div', task.description, { className: task.isCompleted ? classes.completedTask : '' });
        taskElement.addEventListener('click', function() {
            // Agregar lógica de marcado/completado aquí usando la función toggleTaskCompleted
            tasks = toggleTaskCompleted(tasks, index);
            updateTaskList();
        });

        const deleteButton = createNode('button', 'Delete', { type: 'button', className: classes.deleteButton });
        deleteButton.addEventListener('click', function() {
            // Agregar lógica de eliminación aquí usando la función deleteTask
            tasks = deleteTask(tasks, index);
            updateTaskList();
        });

        var updateButton = createNode('button', 'Update', { type: 'button', className: classes.updateButton });
        updateButton.addEventListener('click', function() {
            var updatedText = prompt('Enter updated text:', task.description);
            if (updatedText !== null) {
                tasks = updateTaskText(tasks, index, updatedText);
                updateTaskList();
            }
        });
        

        appendChildren(taskElement, [updateButton]);
        appendChildren(taskElement, [deleteButton]);
        appendChildren(container, [taskElement]);
    });
}


function updateTaskText(tasks, index, updatedText) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    newTasks[index].description = updatedText;
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


