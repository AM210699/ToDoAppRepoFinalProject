// backgroundChanger.js

var darkModeButton = document.getElementById('dark-mode-button');
var lightModeButton = document.getElementById('light-mode-button');

darkModeButton.addEventListener('click', function() {
    setDarkMode();
});

lightModeButton.addEventListener('click', function() {
    setLightMode();
});


function setDarkMode() {
    document.body.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/91acbc73057517.5bfd2266869a1.jpg')";
    document.body.style.color = '#fff'; // Texto en blanco para modo nocturno
    document.body.style.width = '100%'; // Ajusta el ancho del cuerpo al 100%
    document.body.style.minHeight = '100vh'; // Ajusta la altura mínima del cuerpo al 100% de la altura visible

    updateElementColors('dark');
}

function setLightMode() {
    document.body.style.backgroundImage = "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/5278b973057517.5bfd226687bb7.jpg')";
    document.body.style.color = '#000'; // Texto en negro para modo diurno
    document.body.style.width = '100%'; // Ajusta el ancho del cuerpo al 100%
    document.body.style.minHeight = '100vh'; // Ajusta la altura mínima del cuerpo al 100% de la altura visible

    updateElementColors('light');
}

function updateElementColors(mode) {
    const title = document.querySelector('.title');
    const todoInput = document.querySelector('.todo-input');

    if (mode === 'dark') {
        // Colores para modo oscuro
        title.style.color = '#FFFFFF';
        todoInput.style.border = '2px solid #FFFFFF';
        todoInput.style.color = '#fff';
        todoInput.style.backgroundColor = '#333';
    } else {
        // Colores para modo claro
        title.style.color = '#ff6f61'; // Color diferente, ajusta según tu preferencia
        todoInput.style.border = '2px solid #ff6f61'; // Color diferente, ajusta según tu preferencia
        todoInput.style.color = '#000';
        todoInput.style.backgroundColor = '#fff';
    }
}


