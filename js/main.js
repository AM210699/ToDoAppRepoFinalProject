var container = document.getElementById('app');
container.className = 'container';

const classes = {
    title: 'title',
    addButton: 'add-button',
    deleteButton: 'delete-button',
    updateButton: 'update-button',
    completedTask: 'completed-task',
    todoInput: 'todo-input',
    completed: 'completed-button'
};

var title = createNode('h1', 'Todo App', { className: classes.title });
var addButton = createNode('button', 'Add', { type: 'button', className: classes.addButton });
var input = createNode('input', '', { type: 'text', placeholder: 'New task...', className: classes.todoInput });

// Declarar la función add antes de su uso
function addTask(tasks, description, isCompleted = false) {
    var newTasks = tasks.concat({
        description: description,
        isCompleted: isCompleted
    });

    return newTasks;
}

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

function updateTaskList() {
    // Limpiar el contenedor antes de volver a dibujar las tareas
    container.innerHTML = '';

    appendChildren(container, [title, input, addButton]);

    tasks.forEach(function(task, index) {
        const taskElement = createNode('div', task.description, { className: task.isCompleted ? classes.completedTask : '' });
        taskElement.addEventListener('click', function() {
            // Agregar lógica de marcado/completado aquí usando la función toggleTaskCompleted
            updateTaskList();
        });


        var updateButton = createNode('button', 'Update', { type: 'button', className: classes.updateButton });
        updateButton.addEventListener('click', function() {
        var updatedText = prompt('Enter updated text:', task.description);
            if (updatedText !== null) {
            // Actualizar solo la descripción sin cambiar el estado de completado
            tasks = updateTaskText(tasks, index, updatedText);
             updateTaskList();
            }
        });


        const deleteButton = createNode('button', 'Delete', { type: 'button', className: classes.deleteButton });
        deleteButton.addEventListener('click', function() {
            // Agregar lógica de eliminación aquí usando la función deleteTask
            tasks = deleteTask(tasks, index);
            updateTaskList();
        });

        const completeButton = createNode('button', 'Complete', { type: 'button', className: classes.completed });
        completeButton.addEventListener('click', function(event) {
            // Prevenir que el clic se propague al elemento padre (taskElement)
            event.stopPropagation();
            // Llamar a la función toggleTaskCompleted con la fuente 'completeButton'
            tasks = toggleTaskCompleted(tasks, index, 'completeButton');
            updateTaskList();
        });

        



        // Agregar los botones al taskElement
        appendChildren(taskElement, [completeButton, updateButton, deleteButton]);
        appendChildren(container, [taskElement]);
    });
}

function updateTaskText(tasks, index, updatedText) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    newTasks[index].description = updatedText;
    return newTasks;
}


function toggleTaskCompleted(tasks, index, source) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa

    // Verificar si el clic proviene del botón de completar tarea
    if (source === 'completeButton') {
        newTasks[index].isCompleted = !newTasks[index].isCompleted;

        if (newTasks[index].isCompleted) {
            // Mostrar cuadro de confirmación personalizado con SweetAlert2
            Swal.fire({
                title: 'Assignment Completed!',
                text: newTasks[index].description,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Remove from the List',
                background: '#f5f5f5', // Color de fondo
                customClass: {
                    title: 'sweet-alert-title',
                    confirmButton: 'sweet-alert-confirm-button',
                    cancelButton: 'sweet-alert-cancel-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar la tarea automáticamente de la lista
                    newTasks.splice(index, 1);
                    updateTaskList();
                }
            });
        }
    }

    return newTasks;
}


function deleteTask(tasks, index) {
    var newTasks = tasks.slice(); // Crear una copia del array para evitar mutación directa
    newTasks.splice(index, 1);
    return newTasks;
}
