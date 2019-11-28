let companyID;
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
        // Se cargan los campos del formulario con los datos recibidos
        document.querySelector('#rs').value = respuesta['rs'];
        document.querySelector('#address').value = respuesta['address'];
        document.querySelector('#impositiveCategory').value = respuesta['impositiveCategory'];
        document.querySelector('#cuit').value = respuesta['cuit'];
        document.querySelector('#logo').value = respuesta['logo'];

    } catch (err) {
        alert(err.message);
    }
    
}

// Función que guarda los datos de la empresa
async function guardar() {
    
    // Obtengo los datos del DOM
    let rs = document.querySelector('#rs').value;
    let address = document.querySelector('#address').value;
    let impositiveCategory = document.querySelector('#impositiveCategory').value;
    let cuit = document.querySelector('#cuit').value;
    let logo = document.querySelector('#logo').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "rs": rs,
        "address": address,
        "impositiveCategory": impositiveCategory,
        "cuit": cuit,
        "logo": logo
    }

    // Solicito el PUT al servidor
    let response = await fetch(`../company/${companyID}`, {
        "method": "PUT",
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