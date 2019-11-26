
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
    console.log("Datos enviados: " + JSON.stringify(registro));
    // Envío el registro a la API con el método POST
    let response = await fetch("user/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    });
    let respuesta = await response.json();
    // Para debug
    console.log("Datos recibidos: ", respuesta['response']);
    
    // Evaluo la respuesta de la API
    if (respuesta['response']=="ok") {
        switch (respuesta['privilege']) {
            case 'admin': {
                alert("Hola admin");
                break;
            }
            case 'cliente': {
                alert("Hola cliente");
                break;
            }
            case 'supervisor': {
                alert("Hola supervisor");
                break;
            }
        }
    }
    else {
        let loginFooter = document.querySelector('#login-footer');
        loginFooter.innerHTML = "Usuario y/o Contraseña incorrectos."
        loginFooter.classList.add('loginError');
    }    
}