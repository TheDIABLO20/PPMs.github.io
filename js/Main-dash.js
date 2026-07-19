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

async function guardarPPM(){

    const ppm = {

        empleado:
            document.getElementById("empleado").value,

        nombre:
            document.getElementById("nombre").value,

        area:
            document.getElementById("area").value,

        fecha:
            document.getElementById("fecha").value,

        proceso_afectado:
            document.getElementById("procesoAfectado").value,

        delivery_to:
            document.getElementById("deliveryTO").value,

        codigo:
            document.getElementById("codigo").value,

        supervisor_originador:
            document.getElementById("supervisorOriginador").value,

        empleado_reporta:
            document.getElementById("empleadoReporta").value,

        turno_reporta:
            document.getElementById("turnoReporta").value,

        titulo:
            document.getElementById("titulo").value,

        descripcion:
            document.getElementById("descripcion").value

    };

    const { error } =
        await supabase
            .from("ppm")
            .insert([ppm]);

    if(error){

        console.error(error);

        alert(
            "Error al guardar PPM"
        );

        return;
    }

    alert(
        "PPM guardado correctamente"
    );

    limpiarFormulario();

    cargarPPM();
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

async function cargarPPM(){

    const { data, error } =
        await supabase
            .from("ppm")
            .select("*")
            .order("id", {
                ascending: false
            });

    if(error){

        console.error(error);

        return;
    }

    let html = "";

    data.forEach(ppm => {

        html += `
        <tr>

            <td>${ppm.id}</td>
            <td>${ppm.empleado}</td>
            <td>${ppm.nombre}</td>
            <td>${ppm.area}</td>
            <td>${ppm.fecha}</td>
            <td>${ppm.titulo}</td>

        </tr>
        `;

    });

    document.getElementById(
        "listaPPM"
    ).innerHTML = html;

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
