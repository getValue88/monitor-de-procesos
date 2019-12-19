// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del supervisor.
// Se accede al mismo con la sentencia: params['userId']
// Idem para el id del proceso concreto: params['concreteProcessId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];
let concreteProcessId = params['concreteProcessId'];

// Inicializo variables
let encabezadoProceso;
let tareas = [];

// Se llama a la función que muestra el encabezado
mostrarEncabezado();

// Se llama a la función que actualiza el formulario
mostrarTablaTareas();

// Función que muestra el encabezado del dashboard
async function mostrarEncabezado() {
    // Consulto los datos del header del concreto según su id
    try {
        let response = await fetch(`../process/concreteProcess/${concreteProcessId}/header/`);
        encabezadoProceso = await response.json();
    }
    catch (err) {
        alert(err.message);
    }
    // Asigno valores a los campos mostrados
    document.querySelector('#proceso').innerHTML = encabezadoProceso['stdPrcs_name'];
    document.querySelector('#articulo').innerHTML = encabezadoProceso['article_name'];
    document.querySelector('#cantidad').innerHTML = encabezadoProceso['po_quantity'];
}

async function mostrarTablaTareas() {
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
        let iDate = new Date(r.initialDate);
        html += `
            <tr>
                <td>${r.standardTask.name}</td>
                <td>${r.standardTask.description}</td>
                <td>${r.status}></td>
                <td>${r.status}></td>
            </tr>    
        `;
    }
    // Asigno el contenido generado al body de la tabla correspondiente
    document.querySelector("#tbltareas").innerHTML = html;  
}

// Agrego un listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Función que vuelve a la vista anterior
function volver() {
    location.href = `/html/monitor.admin.principal.procesosconcretos.html?userId=${userId}`;
}