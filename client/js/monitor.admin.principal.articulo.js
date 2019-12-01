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
let companyId;
let ncId;

// Botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Se llama a la función que actualiza el formulario
load(userId);

// Función que solicita al servidor los datos de la empresa
async function load(userId) {
    try {
        let response = await fetch(`../user/company/${userId}`);
        let respuesta = await response.json();
        companyId = respuesta['id'];
    } catch (err) {
        alert(err.message);
    }
}

// Función que guarda los datos del artículo y avanza al paso siguiente
async function siguiente() {
    
    // Obtengo los datos del DOM
    let number = document.querySelector('#number').value;
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "number": number,
        "name": name,
        "description": description,
        "company": companyId
    }

    alert(registro['company']);

    // Solicito el POST al servidor
    let response = await fetch(`../article/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    
    // Obtengo el Id de nivel de cambio
    let respuesta = await response.json();
    ncId = respuesta['ncID'];
    
    // Avanza hacia el paso siguiente
    location.href = `/html/monitor.admin.principal.nivelcambio.html?userId=${userId}&ncId=${ncId}`;
}