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

// Agrego su listener al botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Se llama a la función que actualiza el formulario
load(processId);

// Función que solicita al servidor los datos del proceso
async function load(processId) {
    try {
        let response = await fetch(`../process/stdPrcs/${processId}`);
        let respuesta = await response.json();
        document.querySelector('#name').value = respuesta['name'];
        document.querySelector('#description').value = respuesta['description'];
    } catch (err) {
        alert(err.message);
    }
}

// Función que guarda los datos del nivel de cambio y avanza al paso siguiente
async function siguiente() {
    // Obtengo los datos del DOM
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    // Armo un registro con los datos obtenidos
    let registro = {
        "name": name,
        "description": description
    }
    // Solicito el PUT al servidor
    let response = await fetch(`../process/stdPrcs/${processId}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    // Avanzo hacia el paso siguiente
    location.href = `/html/monitor.admin.principal.tareas.html?userId=${userId}&processId=${processId}`;
}