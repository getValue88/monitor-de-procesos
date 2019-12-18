// Leo el parámetro que viene del llamado de la página anterior para obtener el userId del admin.
// Se accede al mismo con la sentencia: params['userId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = {};
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];

// Asigno su listener al botón Ordenes de Compra
let btnOrdenesCompra = document.querySelector("#btnOrdenesCompra");
btnOrdenesCompra.addEventListener("click", ordenesCompra);

// Asigno su listener al botón Cerrar Sesión
let btnCerrarSesion = document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);

// Función que abre l vista de ordenes de compra
function ordenesCompra(){
    location.href = `/html/monitor.cliente.principal.ordenescompra.html?userId=${userId}`; 
}

// Función que cierra la sesión del cliente
function cerrarSesion(){
    location.href = `/monitor.index.html`;
}