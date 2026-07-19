const empleados = {

    "591972": {
        nombre: "GONZALEZ GARCIA, RENE",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "629176": {
        nombre: "SANCHEZ MARTINEZ, BRAYAN ASAEL",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"

    },

    "652428": {
        nombre: "MALDONADO ELIAS, VALERIA",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "664394": {
        nombre: "CORTEZ LEPE, BRAYAN ALEJANDRO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "629160": {
        nombre: "BUSTAMANTE RIVEROLL, ALOHNDRA CRISTINA",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "662158": {
        nombre: "VAZQUEZ CONSTANTINO, ABRAHAM EMILIANO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "493571": {
        nombre: "MARTINEZ CATARINA, VIRGEN",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"

    },

    "694628": {
        nombre: "OSCAR NOLASCO SANTIAGO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "615716": {
        nombre: "CASTRO SOLIS, ABRAHAM ANTONIO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "628506": {
        nombre: "JIMENEZ FUENTES, DEICY ILIANA",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "593583": {
        nombre: "ENCARNACION CASTILLO, LUIS ANTONIO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "652441": {
        nombre: "GARCIA NOCHEBUENA, JESUS ARMANDO",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "659314": {
        nombre: "GONZALEZ DEL ANGEL, CRISTOFHER",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    },

    "615721": {
        nombre: "VAZQUEZ RUIZ, ZINDY",
        area: "EMBARQUES",
        supervisor: "GONZALEZ GARCIA, RENE",
        procesoAfectado: "QUALITY",
        turno: "T-47"
    }

};

function buscarEmpleado(){

    const numero =
        document.getElementById("empleado").value;

    if(empleados[numero]){

        document.getElementById("nombre").value =
            empleados[numero].nombre;

        document.getElementById("area").value =
            empleados[numero].area;

        document.getElementById("supervisorOriginador").value =
            empleados[numero].supervisor;

        document.getElementById("procesoAfectado").value =
            empleados[numero].procesoAfectado;

    }else{

        document.getElementById("nombre").value = "";
        document.getElementById("area").value = "";
        document.getElementById("supervisorOriginador").value = "";
        document.getElementById("procesoAfectado").value = "";
    }
}

function empleadoReporta(){

        const numero =
        document.getElementById("empleadoReporta").value;

    if(empleados[numero]){

        document.getElementById("turnoReporta").value =
            empleados[numero].turno;


    }else{

        document.getElementById("turnoReporta").value = "";

    }
}
