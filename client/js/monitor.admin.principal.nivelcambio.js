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
let ncId = params['ncId'];

alert(" userId: " + userId + " ncId: " + ncId);
// Botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Se llama a la función que actualiza el formulario
load(ncId);

// Función que solicita al servidor los datos del nivel de cambio
async function load(ncId) {
    try {
        let response = await fetch(`../article/nc/${ncId}`);
        let respuesta = await response.json();
        document.querySelector('#date').value = respuesta['date'];
        document.querySelector('#plan').value = respuesta['plan'];
        document.querySelector('#image').value = respuesta['image'];

    } catch (err) {
        alert(err.message);
    }
}

// Función que guarda los datos del nivel de cambio y avanza al paso siguiente
async function siguiente() {

    // Obtengo los datos del DOM
    let date = document.querySelector('#date').value;
    let plan = document.querySelector('#plan').value;
    let image = document.querySelector('#image').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "date": date,
        "plan": plan,
        "image": image
    }

    // Solicito el PUT al servidor
    let response = await fetch(`../article/nc/${ncId}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    
    // Avanza hacia el paso siguiente
    // location.href = `/html/monitor.admin.principal.Proceso.html?userId=${userId}&ncId=${ncId}`;
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}
