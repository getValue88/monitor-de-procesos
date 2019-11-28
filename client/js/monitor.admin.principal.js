// Leo el parámetro que viene del llamado de la página anterior (monitor.index.js)
// para obtener el userId del admin de la empresa a modificar.
// Se accede a la misma con la sentencia: params['userId']
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = {};
for (let i = 0; i < paramarr.length; i++) {
    let tmparr = paramarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
}

let userId = params['userId'];

// Inicializo los botones y les agrego sus listeners de eventos

// Botón Empresa
let btnEmpresa = document.querySelector("#btnEmpresa");
btnEmpresa.addEventListener("click", empresa);

// Botón Articulos
let btnArticulos = document.querySelector("#btnArticulos");
btnArticulos.addEventListener("click", articulos);

// Botón OrdenesCompra
let btnOrdenesCompra = document.querySelector("#btnOrdenesCompra");
btnOrdenesCompra.addEventListener("click", ordenesCompra);

// Botón OrdenesFabricacion
let btnOrdenesFabricacion = document.querySelector("#btnOrdenesFabricacion");
btnOrdenesFabricacion.addEventListener("click", ordenesFabricacion);

// Botón MonitoreoProceso
let btnMonitoreoProcesos = document.querySelector("#btnMonitoreoProcesos");
btnMonitoreoProcesos.addEventListener("click", monitoreoProcesos);

// Botón AnalisisDesempeño
let btnAnalizadorDesempenio = document.querySelector("#btnAnalizadorDesempenio");
btnAnalizadorDesempenio.addEventListener("click", analizadorDesempenio);

async function empresa(){
    location.href = `/html/monitor.admin.principal.empresa.html?userId=${userId}`; 
}

async function articulos(){
    alert("Aquí la funcionalidad del boton #btnArticulos");
}

async function ordenesCompra(){
    alert("Aquí la funcionalidad del boton #btnOrdenesCompra");
}

async function ordenesFabricacion(){
    alert("Aquí la funcionalidad del boton #btnOrdenesfabricacion");
}

async function monitoreoProcesos(){
    alert("Aquí la funcionalidad del boton #btnMonitoreoProcesos");
}

async function analizadorDesempenio(){
    alert("Aquí la funcionalidad del boton #btnAnalizadorDesempenio");
}