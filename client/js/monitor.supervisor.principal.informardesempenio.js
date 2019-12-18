// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del supervisor.
// Se accede al mismo con la sentencia: params['userId']
// Idem para el id de la orden de fabricación: params['manufactureOrderId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];
let manufactureOrderId = params['manufactureOrderId'];

// Inicializo variables
let concreteProcessId;
let procesoConcreto;
let tareas = [];

// Se llama a la función que muestra el encabezado
mostrarEncabezado();

// Se llama a la función que actualiza el formulario
mostrarTablaTareas();

// Función que muestra el encabezado del dashboard
async function mostrarEncabezado() {
    // Consulto los datos del proceso concreto según el id de orden de fabricación
    try {
        let response = await fetch(`../process/concreteProcess/${manufactureOrderId}`);
        procesoConcreto = await response.json();
    }
    catch (err) {
        alert(err.message);
    }
    // Asigno valores a los campos mostrados
    document.querySelector('#proceso').innerHTML = procesoConcreto['stdPrcs_name'];
    document.querySelector('#articulo').innerHTML = procesoConcreto['article_name'];
    document.querySelector('#cantidad').innerHTML = procesoConcreto['po_quantity'];
    // Guardo el id del proceso concreto
    concreteProcessId = procesoConcreto['cctProcess_id'];
}

async function mostrarTablaTareas() {
    // Consulto los datos del proceso concreto según el id de orden de fabricación
    try {
        let response = await fetch(`../process/concreteProcess/${manufactureOrderId}`);
        procesoConcreto = await response.json();
        console.log(procesoConcreto);
    }
    catch (err) {
        alert(err.message);
    }
    // Guardo el id del proceso concreto
    concreteProcessId = procesoConcreto['cctProcess_id'];
    // Consulto las datos de las tareas según el id del proceso concreto
    try {
        let response = await fetch(`../process/concreteTask/${concreteProcessId}`);
        tareas = await response.json();
        tareas.sort((a, b) => a.code - b.code);
    }
    catch (err) {
        alert(err.message);
    }
    // Genero los rows de la tabla
    html = "";
    let estadoDisabled;
    const now = new Date();
    for (let r of tareas) {
        estadoDisabled = "disabled";
        let iDate = new Date(r.initialDate);
        if ((r.initialDate != null) && (r.status < 100) && (now > iDate)) {
            estadoDisabled = "";
        }
        html += `
            <tr>
                <td>${r.standardTask.name}</td>
                <td>${r.standardTask.description}</td>
                <td><input type="range" class="slider${r.id} custom-range" min="0" max="100" step="5" id=${r.id} value=${r.status} ${estadoDisabled}></td>
                <td><button type="button" task_id="${r.id}" class="btn-guardar btn btn-secondary btn-block w-50 m-auto" ${estadoDisabled}>Guardar</button></td>
            </tr>    
        `;
    }
    // Asigno el contenido generado al body de la tabla correspondiente
    document.querySelector("#tbltareas").innerHTML = html;
    // Creo un listener a cada botón de guardar
    let botonesGuardar = document.querySelectorAll(".btn-guardar");
    botonesGuardar.forEach(e => {
        e.addEventListener("click", () => {
            guardar(e.getAttribute('task_id'))
        });
    });
}

// Función que guarda los datos de la tarea modificada
async function guardar(task_id) {
    // Obtengo los datos del DOM
    let status = document.querySelector(`.slider${task_id}`).value;
    // Armo un registro con los datos obtenidos
    let registro = {
        "status": status
    }
    // Solicito el PUT al servidor
    let response = await fetch(`../process/concreteTask/${task_id}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    // Hago un refresh de la tabla
    mostrarTablaTareas();
}

// Agrego un listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Función que vuelve a la vista anterior
function volver() {
    location.href = `/html/monitor.supervisor.principal.ordenesfabricacion.html?userId=${userId}`;
}