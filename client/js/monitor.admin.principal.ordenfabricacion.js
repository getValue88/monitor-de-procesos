// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del admin.
// Se accede al mismo con las sentencia params['userId']
// Idem para purchaseOrderId con params['purchaseOrderId]

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];
let purchaseOrderId = params['purchaseOrderId'];

// Asigno su listener al botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Asigno su listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Llamo a la función que inicializa el formulario
inicializarFormulario(userId, purchaseOrderId);

// Función que inicializa el formulario
async function inicializarFormulario(userId, purchaseOrderId) {
    // Obtengo la fecha de hoy y le sumo un plazo de 7 dias
    let hoy = new Date();
    const plazoInicio = 7;
    hoy.setDate(hoy.getDate() + plazoInicio);
    // Formateo dicha fecha a lo esperado por el input #deliveryDate
    let fecha = formatearFechaForInput(hoy);
    // Finalmente le asigno el valor al input
    document.querySelector('#initialDate').value = fecha;
    document.querySelector('#initialDate').min = formatearFechaForInput(new Date());

    // Indico la orden de compra asociada a la orden de fabricación
    document.querySelector('#purchaseOrderId').value = purchaseOrderId;
    cargarSupervisores();
}

// Función que guarda los datos de la orden de fabricación
async function guardar() {
    // Obtengo los datos del DOM
    let initialDate = new Date(document.querySelector('#initialDate').value);
    // Ajusta la diferencia horaria entre el navegador y UTC
    initialDate.setMinutes(initialDate.getMinutes() + initialDate.getTimezoneOffset());
    // Obtengo la hora inicial
    let time = document.querySelector('#initialTime').value;
    // Armo un arreglo dividiendo por ":"
    let horaMinutos = time.split(":");
    initialDate.setHours(horaMinutos[0]);
    initialDate.setMinutes(horaMinutos[1]);
    alert(initialDate);
    let purchaseOrderId = document.querySelector('#purchaseOrderId').value;
    let supervisorId = document.querySelector('#supervisorId').value;
    // Obtengo el id de la compañia
    let respuesta = [];
    try {
        let response = await fetch(`../user/company/${userId}`);
        respuesta = await response.json();
    } catch (err) {
        alert(err.message);
    }
    let companyId = respuesta['id'];
    // Armo un registro con los datos obtenidos
    let registro = {
        "initialDate": initialDate,
        "purchaseOrder": purchaseOrderId,
        "company": companyId,
        "supervisor": supervisorId
    }
    // Solicito el POST al servidor
    let response = await fetch(`../order/manufacture/`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    });
    // Vuelvo a la página anterior
    location.href = `/html/monitor.admin.principal.ordenescompra.html?userId=${userId}`;
}

// Función que carga el select del formulario con los supervisores de la empresa
async function cargarSupervisores() {
    // Solicito la lista de supervisores
    let listaSupervisores = [];
    // Obtengo el id de la compañia
    let respuesta = [];
    try {
        let response = await fetch(`../user/company/${userId}`);
        respuesta = await response.json();
    } catch (err) {
        alert(err.message);
    }
    // Obtengo el companyId de la empresa
    let companyId = respuesta['id'];
    // Obtengo la lista de supervisores según el companyId
    try {
        let response = await fetch(`../user/supervisores/company/${companyId}`);
        listaSupervisores = await response.json();
    } catch (err) {
        alert(err.message);
    }
    // Identifico el input de tipo select
    let select = document.getElementById("supervisorId"); 
    // Lo cargo con los supervisores
    for (let i = 0; i < listaSupervisores.length; i++) {
        let option = document.createElement("option"); // Creamos la opción
        option.value = listaSupervisores[i]['id']; // Indicamos su valor
        option.innerHTML = listaSupervisores[i]['name']; // Indicamos su texto
        select.appendChild(option); // Insertamos la opción en el select
    }
}

// Función que vuelve a la página anterior
function volver() {
    location.href = `/html/monitor.admin.principal.ordenescompra.html?userId=${userId}`;
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