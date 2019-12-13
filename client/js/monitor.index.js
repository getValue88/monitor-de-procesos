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
    
    // Envío el registro a la API con el método POST
    let response = await fetch("user/login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(registro)
    });
    let respuesta = await response.json();
    
    // Evaluo la respuesta de la API
    if (respuesta['response']=="ok") {
        switch (respuesta['privilege']) {
            case 'admin': {
                // Debug
                console.log("Hola admin");
                console.log("UserId: " + respuesta['id']);
                // El tratamiento se realiza en una página auxiliar
                let userId = respuesta['id'];
                location.href = `/html/monitor.admin.principal.html?userId=${userId}`;               
                break;
            }
            case 'cliente': {
                // Debug
                console.log("Hola cliente");
                console.log("UserId: " + respuesta['id']);
                // El tratamiento se realiza en una página auxiliar
                let userId = respuesta['id'];
                location.href = `/html/monitor.cliente.principal.html?userId=${userId}`;               
                break;
            }
            case 'supervisor': {
                // Debug
                console.log("Hola supervisor");
                console.log("UserId: " + respuesta['id']);
                // El tratamiento se realiza en una página auxiliar
                let userId = respuesta['id'];
                location.href = `/html/monitor.supervisor.principal.html?userId=${userId}`;               
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