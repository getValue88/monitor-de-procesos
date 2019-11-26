
// Inicializo los botones y les agrego sus listeners de eventos

// Botón Login
let btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", loguear);

// Función que intenta loguear al usuario
async function loguear() {
    // Obtengo los datos del DOM
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    // Armo un registro con los datos obtenidos
    let registro = {
        "username": username,
        "password": password,
    }
    // Para debug
    alert("datos enviados: " + JSON.stringify(registro));
    // Envío el registro a la API con el método POST
    let response = await fetch("/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    });
    // Evaluo la respuesta de la API
    
    // Para debug
    alert("Datos recibidos: " + JSON.stringify(response));

}