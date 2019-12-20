// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del supervisor.
// Se accede al mismo con la sentencia: params['userId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];

// Agrego su listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Inicializo el arreglo de ordenes de fabricación
let ordenesfabricacion = [];

// Llamo a la función que actualiza el formulario
mostrarTablaOrdenes();

// Función que muestra por pantalla la tabla de ordenes de fabricación
async function mostrarTablaOrdenes() {
    let respuesta = [];
    // Consulto las ordenes de fabricación que se le han asignado al supervisor
    try {
        let response = await fetch(`../order/manufacture/supervisor/${userId}`);
        ordenesFabricacion = await response.json();
        ordenesFabricacion.sort((a, b) => new Date(a.initialDate) - new Date(b.initialDate));
        console.log(ordenesFabricacion);
    }
    catch (err) {
        alert(err.message);
    }
    // Genero contenido html
    let html = "";
    let estadoDisabled;
    for (let r of ordenesFabricacion) {
        estadoDisabled = "";
        let endDateHTML = "<td>-</td>";
        let endTimeHTML = "<td>-</td>";
        if (r.endDate != null) {
            endDateHTML = `<td>${formatearFecha(r.endDate)}</td>`;
            endTimeHTML = `<td>${extraerHora(r.endDate)}</td>`
            estadoDisabled = ` disabled `;
        }
        html += `
            <tr>
                <td>${formatearFecha(r.initialDate)}</td>
                <td>${extraerHora(r.initialDate)}</td>
                <td>${formatearFecha(r.deliveryDate)}</td>
                <td>${extraerHora(r.deliveryDate)}</td>
                ${endDateHTML}
                ${endTimeHTML}
                <td><button type="button" id="${r.id}" class="btn-informarDesempenio btn btn-secondary btn-block btn-sm" ${estadoDisabled}>Informar Desempeño</button></td>
            </tr>    
        `;
    }
    // Asigno el contenido html generado al body de la tabla
    document.querySelector("#tblOrdenesFabricacion").innerHTML = html;
    // Asigno un listener a cada botón generado
    let botonesInformarDesempenio = document.querySelectorAll(".btn-informarDesempenio");
    botonesInformarDesempenio.forEach(e => {
        console.log(e.id);
        e.addEventListener("click", () => {
            informarDesempenio(e.id)
        });
    });
}

// Función que llama a la vista de informar desempenio
async function informarDesempenio(manufactureOrderId) {
    location.href = `/html/monitor.supervisor.principal.informardesempenio.html?userId=${userId}&manufactureOrderId=${manufactureOrderId}`;
}

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
    location.href = `/html/monitor.supervisor.principal.html?userId=${userId}`;
}

// Función que extrae la hora a partir de una fecha
function extraerHora(fecha) {
    let date = new Date(fecha);
    let hora = date.getHours();
    if (hora < 10) {
        hora = "0" + hora;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return horaInicio = "" + hora + ":" + minutes;
}
