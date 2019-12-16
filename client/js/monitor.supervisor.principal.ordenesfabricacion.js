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

// Debug
console.log(" userId: " + userId);

// Inicializo el arreglo de ordenes de fabricación
let ordenesfabricacion = [];

// Se llama a la función que actualiza el formulario
mostrarTablaOrdenes();

// Botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Función que muestra por pantalla la tabla de ordenes de compra
async function mostrarTablaOrdenes() {

    let respuesta = [];
    // Obtengo el id de la compañia a la que le compra el cliente
    try {
        let response = await fetch(`../user/company/${userId}`);
        respuesta = await response.json();
    } catch (err) {
        alert(err.message);
    }

    let companyId = respuesta['id'];
    console.log("Id de la compania = " + companyId);


    // Consulto las ordenes de compra existentes
    try {
        let response = await fetch(`../order/manufacture/supervisor/${userId}`);
        ordenesFabricacion = await response.json();
    }
    catch (err) {
        alert(err.message);
    }

    // Se genera contenido html
    let table = document.getElementById("tbl");
    let html = "";
    let estadoDisabled;
    
    for (let r of ordenesFabricacion) {
        estadoDisabled = "";
        let endDateHTML = "<td>-</td>";
        if (r.endDate != null) {
            endDateHTML = `<td>${formatearFecha(r.endDate)}</td>`;
            estadoDisabled = ` disabled `;
        }
        html += `
            <tr>
                <td>${r.id}</td>
                <td>${formatearFecha(r.initialDate)}</td>
                <td>${formatearFecha(r.deliveryDate)}</td>
                ${endDateHTML}
                <td><button type="button" id="${r.id}" class="btn-informarDesempenio btn btn-secondary btn-block" ${estadoDisabled}>Informar Desempeño</button></td>
            </tr>    
        `;
    }

    // Se asigna el contenido generado al body de la tabla
    document.querySelector("#tblOrdenesFabricacion").innerHTML = html;

    // Asigno un listener a cada botón
    let botonesInformarDesempenio = document.querySelectorAll(".btn-informarDesempenio");
    botonesInformarDesempenio.forEach(e => {
        console.log(e.id);
        e.addEventListener("click", () => {
            informarDesempenio(e.id)
        });
    });

}

// Función que informa el desempenio del proceso asociado a la orden de fabricación
async function informarDesempenio(manufactureOrderId) {
    location.href = `/html/monitor.supervisor.principal.informarDesempenio.html?userId=${userId}&manufactureOrderId=${manufactureOrderId}`;
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