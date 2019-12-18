// Leo el parámetro que viene del llamado de la página anterior
// para obtener el userId del admin y el ncId del cambio.
// Se accede a los mismos con las sentencias: 
// params['userId'] y params['ncId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = [];
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];
let ncId = params['ncId'];

// Declaro variables
let processId;

// Asigno su listener al botón Siguiente
let btnSiguiente = document.querySelector("#btnSiguiente");
btnSiguiente.addEventListener("click", siguiente);

// Llamo a la función que inicializa el formulario
load(ncId);

// Función que inicializa el formulario
async function load(ncId) {
    try {
        let response = await fetch(`../article/nc/${ncId}`);
        let respuesta = await response.json();
        // Obtengo la fecha de hoy y le doy el formato esperado por el input
        let hoy = new Date();
        document.querySelector('#date').value = formatearFechaForInput(hoy);
        document.querySelector('#plan').value = respuesta['plan'];
        document.querySelector('#image').value = respuesta['image'];
        processId = respuesta['process']['id'];
    } catch (err) {
        alert(err.message);
    }
}

// Función que guarda los datos del nivel de cambio y avanza al paso siguiente
async function siguiente() {
    // Obtengo los datos del DOM
    let date = new Date(document.querySelector('#date').value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    let plan = document.querySelector('#plan').value;
    let image = document.querySelector('#image').value;
    // Armo un registro con los datos obtenidos
    let registro = {
        "date": date,
        "plan": plan,
        "image": image
    }
    // Solicito el PUT al servidor
    let response = await fetch(`../article/nc/${ncId}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    })
    // Avanza hacia el paso siguiente
    location.href = `/html/monitor.admin.principal.proceso.html?userId=${userId}&processId=${processId}`;
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