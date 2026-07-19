function esAdmin(){

    return localStorage.getItem("esAdmin")
    === "true";

}

function mostrar(id){

    document.querySelectorAll('.seccion').forEach(sec=>{
        sec.style.display='none';
    });

    document.getElementById(id).style.display='block';

    if(id === "verppm"){
        cargarPPM();
    }
}

function toggleSidebar(){
    document.getElementById('sidebar')
            .classList.toggle('collapsed');
}

function cerrarSesion(){

    if(confirm("¿Deseas cerrar sesión?")){
        window.location.href = "index.html";
    }

}

function guardarPPM(){

    let registros =
        JSON.parse(localStorage.getItem("ppm")) || [];

    let ultimoId =
        Number(localStorage.getItem("ultimoId")) || 0;

    ultimoId++;

    localStorage.setItem(
        "ultimoId",
        ultimoId
    );

    let ppm = {

        id: ultimoId,

        empleado: document.getElementById("empleado").value,
        nombre: document.getElementById("nombre").value,
        area: document.getElementById("area").value,
        fecha: document.getElementById("fecha").value,

        procesoAfectado: document.getElementById("procesoAfectado").value,
        deliveryTO: document.getElementById("deliveryTO").value,
        codigo: document.getElementById("codigo").value,

        supervisorOriginador: document.getElementById("supervisorOriginador").value,

        empleadoReporta: document.getElementById("empleadoReporta").value,
        turnoReporta: document.getElementById("turnoReporta").value,

        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,

        fechaRegistro: new Date().toLocaleString()
    };

    registros.push(ppm);

    localStorage.setItem(
        "ppm",
        JSON.stringify(registros)
    );

    alert("PPM guardado correctamente.");

    limpiarFormulario();

    if(typeof cargarPPM === "function"){
        cargarPPM();
    }

}

function cargarPPM(){

    let registros =
        JSON.parse(localStorage.getItem("ppm")) || [];

    let html = "";

    registros.forEach(ppm=>{

        let botonEliminar = "";

        if(esAdmin()){

            botonEliminar = `
                <button
                    onclick="eliminarPPM(${ppm.id})"
                    class="btn-delete">
                    Eliminar
                </button>
            `;
        }

        html += `
        <tr>

            <td>${ppm.id}</td>

            <td>${ppm.empleado}</td>

            <td>${ppm.nombre}</td>

            <td>${ppm.area}</td>

            <td>${ppm.fecha}</td>

            <td>${ppm.procesoAfectado}</td>

            <td>${ppm.deliveryTO}</td>

            <td>${ppm.codigo}</td>

            <td>${ppm.supervisorOriginador}</td>

            <td>${ppm.empleadoReporta}</td>

            <td>${ppm.turnoReporta}</td>

            <td>${ppm.titulo}</td>

            <td>

                <button
                    onclick="verPPM(${ppm.id})"
                    class="btn-ver">
                    Ver
                </button>

                ${botonEliminar}

            </td>

        </tr>
        `;
    });

    document.getElementById("listaPPM").innerHTML = html;
}

function verPPM(id){

    let registros =
        JSON.parse(localStorage.getItem("ppm")) || [];

    let ppm =
        registros.find(x => x.id == id);

    document.getElementById("detallePPM").innerHTML = `

        <p><strong>ID:</strong> ${ppm.id}</p><br>

        <p><strong>Empleado:</strong>
        ${ppm.empleado}</p>

        <p><strong>Nombre:</strong>
        ${ppm.nombre}</p>

        <p><strong>Área:</strong>
        ${ppm.area}</p>

        <p><strong>Fecha:</strong>
        ${ppm.fecha}</p>

        <p><strong>Título:</strong>
        ${ppm.titulo}</p>

        <p><strong>Descripción:</strong>
        ${ppm.descripcion}</p>

    `;

    document.getElementById("modalPPM")
            .style.display = "flex";
}

function cerrarModal(){

    document.getElementById("modalPPM")
            .style.display = "none";

}
function eliminarPPM(id){

    if(confirm("¿Desea eliminar este PPM?")){

        let registros =
            JSON.parse(localStorage.getItem("ppm")) || [];

        registros = registros.filter(
            ppm => ppm.id !== id
        );

        localStorage.setItem(
            "ppm",
            JSON.stringify(registros)
        );

        cargarPPM();
    }
}

function limpiarFormulario(){
    document.getElementById("empleado").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("area").value = "";
    document.getElementById("fecha").value = "";

    document.getElementById("procesoAfectado").value = "";
    document.getElementById("deliveryTO").value = "";

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";

    document.getElementById("supervisorOriginador").value = "";

    document.getElementById("empleadoReporta").value = "";
    document.getElementById("turnoReporta").value = "";

    document.getElementById("descripcion").value = "";

    document.getElementById("imagenes").value = "";

}

function cargarUsuario(){

    const nombre =
        localStorage.getItem("nombreUsuario");

    document.getElementById("usuarioNombre")
        .textContent = nombre;

}

window.onload = function(){

    cargarUsuario();

}
