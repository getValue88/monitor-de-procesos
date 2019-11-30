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
let companyID;

// Botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Se llama a la función que actualiza el formulario
load(userId);

// Función que solicita al servidor los datos de la empresa
async function load(userId) {
    try {
        let response = await fetch(`../user/company/${userId}`);
        let respuesta = await response.json();

        companyID = respuesta['id'];

    } catch (err) {
        alert(err.message);
    }

}

// Función que guarda los datos del artículo
async function guardar() {

    // Obtengo los datos del DOM
    let number = document.querySelector('#number').value;
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "number": number,
        "name": name,
        "description": description,
        "company": companyID
    }

    // Solicito el POST al servidor
    let response = await fetch(`../article/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })

    // Vuelve a la página principal
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}

function volver() {
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}