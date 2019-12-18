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

// Asigno su listener al botón Empresa
let btnEmpresa = document.querySelector("#btnEmpresa");
btnEmpresa.addEventListener("click", empresa);

// Asigno su listener al botón Artículos
let btnArticulos = document.querySelector("#btnArticulos");
btnArticulos.addEventListener("click", articulos);

// Asigno su listener al botón Ordenes de Compra
let btnOrdenesCompra = document.querySelector("#btnOrdenesCompra");
btnOrdenesCompra.addEventListener("click", ordenesCompra);

// Asigno su listener al botón Ordenes de Fabricación
let btnOrdenesFabricacion = document.querySelector("#btnOrdenesFabricacion");
btnOrdenesFabricacion.addEventListener("click", ordenesFabricacion);

// Asigno su listener al botón Cerrar Sesión
let btnCerrarSesion = document.querySelector("#btnCerrarSesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);

async function empresa(){
    location.href = `/html/monitor.admin.principal.empresa.html?userId=${userId}`; 
}

async function articulos(){
    location.href = `/html/monitor.admin.principal.articulo.html?userId=${userId}`; 
}

async function ordenesCompra(){
    location.href = `/html/monitor.admin.principal.ordenescompra.html?userId=${userId}`; 
}

async function ordenesFabricacion(){
    alert("Aquí la funcionalidad del boton #btnOrdenesfabricacion");
}

async function cerrarSesion(){
    location.href = `/monitor.index.html`;
}