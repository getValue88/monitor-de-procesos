// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del cliente.
// Se accede al mismo con la sentencia: params['userId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];

// Inicializo el arreglo de ordenes de compra
let ordenesCompra = [];

// Debug
console.log(" userId: " + userId);

// Botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Se llama a la función que actualiza el formulario
mostrarTablaOrdenes();

// Función que guarda los datos de la nueva orden de compra
async function guardar() {

    // Obtengo los datos del DOM
    let article = document.querySelector('#article').value;
    let quantity = document.querySelector('#quantity').value;
    let deliveryDate = document.querySelector('#deliveryDate').value;

    // Armo un registro con los datos obtenidos
    let registro = {
        "article": article,
        "quantity": quantity,
        "deliveryDate": deliveryDate,
        "client": userId
    }

    // Solicito el POST al servidor
    let response = await fetch(`../order/purchase/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    });

    // Actualizo la tabla
    mostrarTablaOrdenes();

}

function volver() {
    // Vuelve a la página principal
    location.href = `/html/monitor.cliente.principal.html?userId=${userId}`;
}

// Función que muestra por pantalla la tabla de tareas
async function mostrarTablaOrdenes() {
    // Consulto las ordenes de compra existentes
    try {
        let response = await fetch(`../order/purchase/client/${userId}`);
        ordenesCompra = await response.json();
        // Debug
        console.log(ordenesCompra);
    }
    catch (err) {
        alert(err.message);
    }
    // Se genera contenido html
    let table = document.getElementById("tbl");
    html = "";
    for (let r of ordenesCompra) {
        html += `
            <tr>
                <td>${r.initialDate}</td>
                <td>${r.id}</td>
                <td>${r.quantity}</td>
                <td>${r.deliveryDate}</td>
                <td>${r.status}</td>
            </tr>    
        `;
    }
    // Se asigna el contenido generado al body de la tabla
    document.querySelector("#tblOrdenesCompra").innerHTML = html;
}

