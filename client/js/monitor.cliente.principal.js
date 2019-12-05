// Leo el parámetro que viene del llamado de la página anterior
// para obtener el userId del admin.
// Se accede al mismo con la sentencia: params['userId']

let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = {};
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}
let userId = params['userId'];

// Botón Ordenes de Compra
let btnOrdenesCompra = document.querySelector("#btnOrdenesCompra");
btnOrdenesCompra.addEventListener("click", ordenesCompra);

// Botón Cerrar Sesión
let btnCerrarSesion = document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);

function ordenesCompra(){
    location.href = `/html/monitor.cliente.principal.ordenescompra.html?userId=${userId}`; 
}

function cerrarSesion(){
    location.href = `/monitor.index.html`;
}
