// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del admin.
// Se accede al mismo con las sentencia: 
// params['userId']
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];

// Declaro variables
let companyID;

// Asigno su listener al botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Asigno su listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Llamo a la función que actualiza el formulario
load(userId);

// Función que actualiza el formulario con los datos existentes
async function load(userId) {
    try {
        // Busco la compania que corresponde al userId
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

    if(validarCuit(cuit)){
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
        // Vuelvo a la página anterior
        volver();
    } else{
        document.querySelector('#cuit').classList.add('is-invalid');
    }
}

// Función que vuelve a la página anterior
function volver() {
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}

function validarCuit(cuit) {
    return /\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/.test(cuit);
}