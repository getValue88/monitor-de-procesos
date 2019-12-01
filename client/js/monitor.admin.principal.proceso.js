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

alert(" userId: " + userId + " processId: " + processId);

// Botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Se llama a la función que actualiza el formulario
load(processId);

// Función que solicita al servidor los datos del proceso
async function load(ncId) {
    try {
        let response = await fetch(`../article/process/${processId}`);
        let respuesta = await response.json();
        document.querySelector('#date').value = respuesta['name'];
        document.querySelector('#plan').value = respuesta['description'];
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
    let response = await fetch(`../article/process/${processId}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    
    // Avanza hacia el paso siguiente
    location.href = `/html/monitor.admin.principal.proceso.html?userId=${userId}&processId=${processId}`;
}
