// Leo el parámetro que viene del llamado de la página anterior
// para obtener el userId del admin y el processId del proceso.
// Se accede a los mismos con la sentencias: 
// params['userId'] y params['processId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];
let processId = params['processId'];

// Inicializo el arreglo de tareas
let tareas = [];

// Preseteo el nombre de la tarea como Op. 10, Op. 20, Op. 30, etc.
document.querySelector('#name').value = "Op. " + (tareas.length + 1) * 10;

// Debug
console.log(" userId: " + userId + " processId: " + processId);

// Botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Botón Terminar
let btnTerminar = document.querySelector("#btnTerminar");
btnTerminar.addEventListener("click", terminar);

// Se llama a la función que actualiza el formulario
load(processId);

// Función que solicita al servidor los datos de las tareas existentes
async function load(processId) {
    // En esta instancia no hay tareas en la base. Están en un arreglo de memoria.
    // Así que no se hace un fetch.
    mostrarTablaTareas(tareas);
}

// Función que guarda los datos del nivel de cambio y avanza al paso siguiente
async function guardar() {

    // Obtengo los datos del DOM
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    let requiredTime = document.querySelector('#requiredTime').value;

    // Asumo que el dato requiredTime que venga va a ser incorrecto
    document.querySelector('#requiredTime').classList.add('is-invalid');

    // Valido que requiredTime sea un número y mayor a cero
    if (!isNaN(requiredTime) && (requiredTime > 0)) {

        // Como requiredTime es correcto le elimino la clase de dato inválido
        document.querySelector('#requiredTime').classList.remove('is-invalid');

        // Armo un registro con los datos obtenidos
        let registro = {
            "name": name,
            "description": description,
            "requiredTime": requiredTime,
            "process": processId
        }

        // Guardo la tarea en el arreglo de tareas
        tareas.push(registro);

        // Actualizo la tabla
        mostrarTablaTareas(tareas);

        // Vacio los datos de los inputs
        document.querySelector('#name').value = "";
        document.querySelector('#description').value = "";
        document.querySelector('#requiredTime').value = "";
        // Preseteo el nombre de la tarea como Op. 10, Op. 20, Op. 30, etc.
        document.querySelector('#name').value = "Op. " + (tareas.length + 1) * 10;
    }
}

async function terminar() {
    // Solicito el POST al servidor
    let response = await fetch(`../process/stdTask/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(tareas)
    });
    // Vuelve a la página principal
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}

// Función que muestra por pantalla la tabla de tareas
function mostrarTablaTareas(tareas) {
    let table = document.getElementById("tbl");
    html = "";
    for (let r of tareas) {
        html += `
            <tr>
                <td>${r.name}</td>
                <td>${r.description}</td>
                <td>${r.requiredTime}</td>
            </tr>    
        `;
    }
    // Se asigna el contenido generado al body de la tabla correspondiente
    document.querySelector("#tblTareas").innerHTML = html;
}