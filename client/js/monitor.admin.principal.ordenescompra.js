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

// Llamo a la función que actualiza el formulario
mostrarTablaOrdenes();

// Agrego su listener al botón Volver
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
    // Obtengo el companyId de la empresa
    let companyId = respuesta['id'];
    // Consulto las ordenes de compra existentes según el companyId
    try {
        let response = await fetch(`../order/purchase/company/${companyId}`);
        ordenesCompra = await response.json();
    }
    catch (err) {
        alert(err.message);
    }
    // Genero contenido html
    let html = "";
    let estadoDisabled;
    for (let r of ordenesCompra) {
        estadoDisabled = "";
        if (r.status != 0) {
            estadoDisabled = ` disabled `;
        }
        html += `
            <tr>
                <td>${formatearFecha(r.initialDate)}</td>
                <td>${r.article['name']}</td>
                <td>${r.quantity}</td>
                <td>${formatearFecha(r.deliveryDate)}</td>
                <td>${statusOC(r.status)}</td>
                <td><div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${r.status*100/3}%" aria-valuenow="${r.status*100/3}" aria-valuemin="0" aria-valuemax="100"></div>
              </div></td>
                <td><button type="button" id="${r.id}" class="btn-asignarOF btn btn-secondary btn-block btn-sm" ${estadoDisabled}>Asignar OF</button></td>
            </tr>    
        `;
    }

    // Se asigna el contenido generado al body de la tabla
    document.querySelector("#tblOrdenesCompra").innerHTML = html;

    // Asigno un listener a cada botón
    let botonesAsignarOF = document.querySelectorAll(".btn-asignarOF");
    botonesAsignarOF.forEach(e => {
        console.log(e.id);
        e.addEventListener("click", () => {
            asignarOF(e.id)
        });
    });

}

// Función que asigna una orden de fabricación segun el número de orden de compra
// (purchaseOrderId) indicado como parámetro
async function asignarOF(purchaseOrderId) {
    location.href = `/html/monitor.admin.principal.ordenfabricacion.html?userId=${userId}&purchaseOrderId=${purchaseOrderId}`;
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
            return "OF asignada";
        case 2:
            return "En Proceso";
        case 3:
            return "Finalizada";
        default:
            return "Sin estado";
    }
}

function volver() {
    location.href = `/html/monitor.admin.principal.html?userId=${userId}`;
}