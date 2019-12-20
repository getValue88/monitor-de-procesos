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
        console.log(tareas);
    }
    catch (err) {
        alert(err.message);
    }

    
    // Genero los rows de la tabla
    html = "";
    for (let r of tareas) {
        // Calculo el desempeño del proceso
        const tiempoTardado = new Date(r.endDate) - new Date(r.initialDate);
        const tiempoEstimado = new Date(r.deliveryDate) - new Date(r.initialDate);
        let desempeño = 0;
        let clase = "";
        if ((new Date(r.initialDate) <= new Date()) && (r.status >= 0) && (r.status < 100) && r.initialDate)
            desempeño = (r.status - ((new Date() - new Date(r.initialDate)) * 100) / tiempoEstimado);
        if (r.status == 100) {
            if (tiempoTardado > tiempoEstimado) {
                desempeño = 100 - (tiempoTardado / tiempoEstimado) * 100;
            }
            if (tiempoTardado < tiempoEstimado) {
                desempeño = ((tiempoEstimado / tiempoTardado) * 100) - 100;
            }
        }
        // Seg{un el desempeño obtenido seteo el color de la etiqueta a mostrar}
        if (desempeño > 0) {
            clase = 'badge badge-success';
        }
        if (desempeño < 0) {
            clase = 'badge badge-danger';
        }
        html += `
            <tr>
                <td>${r.standardTask.name}</td>
                <td>${r.standardTask.description}</td>
                <td><div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${r.status}%;" aria-valuenow="${r.status}" aria-valuemin="0" aria-valuemax="100">${r.status}%</div>
                    </div>
                </td>
                <td class="text-center"><span class="${clase} p-1 m-auto">${(desempeño).toFixed(2)}%</span></td>
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