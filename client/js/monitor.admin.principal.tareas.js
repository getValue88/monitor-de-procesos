// Leo el parámetro que viene del llamado de la página anterior (monitor.index.js)
// para obtener el userId del admin de la empresa a modificar.
// Se accede a la misma con la sentencia: params['userId']
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}

let userId = params['userId'];
let processId = params['processId'];
let tareas = [];

alert(" userId: " + userId + " processId: " + processId);

// Botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Se llama a la función que actualiza el formulario
load(processId);

// Función que solicita al servidor los datos de las tareas existentes
async function load(processId) {
    try {
        let response = await fetch(`../process/stdPrcs/${processId}`);
        let tareas = await response.json();
    } catch (err) {
        alert(err.message);
    }
}

// Función que guarda los datos del nivel de cambio y avanza al paso siguiente
async function siguiente() {

    // Obtengo los datos del DOM
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    let requiredTime = document.querySelector('#requiredTime').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "name": name,
        "description": description,
        "requiredTime": requiredTime,
        "process": processId
    }
    
    tareas.push(registro);

    // Solicito el POST al servidor
    let response = await fetch(`../process/stdTask/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(tareas)
    })
    
    // Vuelve a la página principal
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}