const usuarios = {

    "629176": {
        nombre: "BRAYAN ASAEL SANCHEZ MARTINEZ",
        password: "Reynosa01",
        admin: true
    },

    "591972": {
        nombre: "RENE GONZALEZ GARCIA",
        password: "Rene01",
        admin: true
    },

    "652428": {
        nombre: "MALDONADO ELIAS, VALERIA",
        password: "Valeria01",
        admin: false
    },

    "664394": {
        nombre: "CORTEZ LEPE, BRAYAN ALEJANDRO",
        password: "Brayan02",
        admin: false
    },

    "629160": {
        nombre: "BUSTAMANTE RIVEROLL, ALOHNDRA CRISTINA",
        password: "Alohndra01",
        admin: false
    },
    "652934": {
        nombre: "De La Cruz Hernandez,Isidro Francisco",
        password: "Reynosa01",
        admin: true
    }

};

function login(){

    const usuario =
        document.getElementById("usuario").value.trim();

    const password =
        document.getElementById("password").value;

    const datos = usuarios[usuario];

    if(datos && datos.password === password){

        localStorage.setItem(
            "usuarioActual",
            usuario
        );

        localStorage.setItem(
            "esAdmin",
            datos.admin
        );

        localStorage.setItem(
            "nombreUsuario",
            datos.nombre
        );

        window.location.href =
            "dashboard.html";

    }else{

        document.getElementById("error").style.display = "block";

    }
}

function cargarUsuario(){

    const nombre =
        localStorage.getItem("nombreUsuario");

    document.getElementById("usuarioNombre")
        .textContent = nombre || "Usuario";

}

window.onload = function(){

    cargarUsuario();

}
