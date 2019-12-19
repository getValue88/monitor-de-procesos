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

// Inicializo los inputs del formulario
inicializarInputs();

// Asigno su listener al botón Guardar
let btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", guardar);

// Asigno su listener al botón Volver
let btnVolver = document.querySelector("#btnVolver");
btnVolver.addEventListener("click", volver);

// Llamo a la función que actualiza el formulario
mostrarTablaOrdenes();

// Función que guarda los datos de la nueva orden de compra
async function guardar() {
    // Obtengo los datos del DOM
    let article = document.querySelector('#article').value;
    let quantity = document.querySelector('#quantity').value;
    let deliveryDate = new Date(document.querySelector('#deliveryDate').value);
    deliveryDate.setMinutes(deliveryDate.getMinutes() + deliveryDate.getTimezoneOffset());
    
    // Supongo que el dato quantity que va a venir es inválido
    document.querySelector('#quantity').classList.add('is-invalid');
    // Compruebo que quantity sea de tipo número y mayor a cero
    if (!isNaN(quantity) && (quantity > 0)) {
        // Como quantity es correcto elimino la clase de dato inválido
        document.querySelector('#quantity').classList.remove('is-invalid');
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
        // Inicializo los inputs del form para una nueva carga
        inicializarInputs();
    }
}

// Función quelve a la página principal
function volver() {
    location.href = `/html/monitor.cliente.principal.html?userId=${userId}`;
}

// Función que muestra por pantalla la tabla de ordenes de compra
async function mostrarTablaOrdenes() {
    // Consulto las ordenes de compra existentes
    try {
        let response = await fetch(`../order/purchase/client/${userId}`);
        ordenesCompra = await response.json();
        ordenesCompra.sort((a,b) => a.initialDate > b.initialDate);
    }
    catch (err) {
        alert(err.message);
    }
    // Genero el contenido html de la tabla
    let html = "";
    for (let r of ordenesCompra) {
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
            </tr>    
        `;
    }
    // Asigno el contenido generado al body de la tabla
    document.querySelector("#tblOrdenesCompra").innerHTML = html;
}

// Función que inicializa los inputs del formulario
function inicializarInputs() {
    // Cargo el select con los artículos disponibles
    cargarArticulos();
    document.querySelector('#article').value = 1;
    document.querySelector('#quantity').value = "";
    // Obtengo la fecha de hoy y le sumo un plazo minimo de entrega
    let hoy = new Date();
    const plazoEntrega = 7;
    hoy.setDate(hoy.getDate() + plazoEntrega);
    // Formateo dicha fecha a lo esperado por el input #deliveryDate
    let fecha = formatearFechaForInput(hoy);
    // Finalmente le asigno el valor al input
    document.querySelector('#deliveryDate').value = fecha;
    document.querySelector('#deliveryDate').min = formatearFechaForInput(new Date());
}

// Función que dada una fecha completa de sistema (de tipo string) la formatea a 'dd-mm-aaaa'
function formatearFecha(fecha) {
    let d = new Date(fecha);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
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

// Función que dada una fecha completa de sistema (de tipo Date) la formatea a lo esperado en 
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

// Función que carga el input de tipo select con los artículos disponibles
async function cargarArticulos() {
    let respuesta = [];
    // Obtengo el id de la compañia a la que le compra el cliente
    try {
        let response = await fetch(`../user/company/${userId}`);
        respuesta = await response.json();
    } catch (err) {
        alert(err.message);
    }
    let companyId = respuesta['id'];
    // Solicito la lista de artículos utilizando el companyId
    let listaArticulos = [];
    try {
        let response = await fetch(`../article/company/${companyId}`);
        listaArticulos = await response.json();
    } catch (err) {
        alert(err.message);
    }
    // Identifico el inpu de tipo select
    let select = document.getElementById("article");
    // Vacio su lista de opciones
    select.innerHTML = "";
    // Lo cargo con los articulos disponibles
    for(let i=0; i < listaArticulos.length; i++){ 
        let option = document.createElement("option"); // Creamos la opción
        option.value = listaArticulos[i]['id']; // Indicamos su valor
        option.innerHTML = listaArticulos[i]['name']; // Indicamos su texto
        select.appendChild(option); // Insertamos la opción en el select
    }
}