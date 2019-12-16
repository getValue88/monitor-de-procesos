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
    }
    catch (err) {
        alert(err.message);
    }

    let table = document.getElementById("tbl");
    html = "";
    tareas.sort((a, b) => a.code - b.code);
    console.log(tareas);

    let estadoDisabled = "";

    for (let r of tareas) {
        html += `
            <tr>
                <td>${r.standardTask.name}</td>
                <td>${r.standardTask.description}</td>
                <td><input type="range" class="custom-range" min="0" max="100" step="5" id="statusRange" value=${r.status}></td>
                <td><button type="button" id="${r.id}" class="btn-guardar btn btn-secondary btn-block w-50 m-auto" ${estadoDisabled}>Guardar</button></td>
            </tr>    
        `;
    }
    // Se asigna el contenido generado al body de la tabla correspondiente
    document.querySelector("#tbltareas").innerHTML = html;
}

// Botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Función que dada una fecha completa de sistema (de tipo string) la formatea a 'dd-mm-aaaa'
function formatearFecha(fecha) {
    let d = new Date(fecha);
    const anio = d.getFullYear();
    let mes = d.getMonth() + 1; // Enero es 0!
    let dia = d.getDate();
    if (mes < 10)
        mes = "0" + mes;
    if (dia < 10)
        dia = "0" + dia;
    let fechaFormateada = "" + dia + "-" + mes + "-" + anio;
    return fechaFormateada;
}

// Función que dada una fecha completa de sistema (de tipo object) la formatea a lo esperado en 
// un input de tipo 'date'
function formatearFechaForInput(fecha) {
    const anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1; // Enero es 0!
    let dia = fecha.getDate();
    if (mes < 10)
        mes = "0" + mes;
    if (dia < 10)
        dia = "0" + dia;
    let fechaFormateada = "" + anio + "-" + mes + "-" + dia;
    return fechaFormateada;
}

// Función que dado el estado de una OC (de tipo number) devuelve un string descriptivo
function statusOC(status) {
    switch (status) {
        case -1:
            return "Rechazada";
        case 0:
            return "En análisis";
        case 1:
            return "Con OF asignada";
        case 2:
            return "En Proceso";
        case 3:
            return "Finalizada";
        default:
            return "Sin estado";
    }
}

function volver() {
    location.href = `/html/monitor.supervisor.principal.ordenesfabricacion.html?userId=${userId}`;
}