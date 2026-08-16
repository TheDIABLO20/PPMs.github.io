const supabaseUrl =
"https://drxvkseiacmrzedbzysc.supabase.co";
const supabaseKey =
"sb_publishable_Al2Oh_KYr2JtXeqzrfxaKg__gVQmzg_";

const { createClient } = supabase;

const supabaseClient = createClient(
    supabaseUrl,
    supabaseKey

);

function cerrarSesion(){

    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("esAdmin");
    localStorage.removeItem("nombreUsuario");

    window.location.replace("index.html");

}
let listaPPM = [];

function esAdmin(){

    return localStorage.getItem("esAdmin")
    === "true";

}

function verPPM(id) {

    const ppm = listaPPM.find(
        x => Number(x.id) === Number(id)
    );

    if (!ppm) {
        alert("Registro no encontrado");
        return;
    }

    document.getElementById("d_id").textContent = ppm.id;
    document.getElementById("d_empleado").textContent = ppm.empleado;
    document.getElementById("d_nombre").textContent = ppm.nombre;
    document.getElementById("d_area").textContent = ppm.area;
    document.getElementById("d_fecha").textContent = ppm.fecha;
    document.getElementById("d_titulo").textContent = ppm.titulo;
const imagenes = JSON.parse(ppm.imagen_url || "[]");

document.getElementById("galeria").innerHTML = `
    <button class="btn-evidencias" onclick="verEvidencias(${ppm.id})">
        Ver Evidencias (${imagenes.length})
    </button>
`;

    mostrar("detalleppm");
}

function abrirImagen(url){

    document.getElementById("imagenGrande").src = url;

    document.getElementById("visorImagen").style.display =
        "flex";
}

function verEvidencias(id){

    const ppm = listaPPM.find(
        x => Number(x.id) === Number(id)
    );

    if(!ppm){
        return;
    }

    const imagenes = JSON.parse(
        ppm.imagen_url || "[]"
    );

    let html = "";

imagenes.forEach(url => {

    html += `
        <img
            src="${url}"
            onclick="abrirImagen('${url}')"
            style="
                max-width       box-shadow:0 3px 10px rgba(0,0,0,.2);
            "
        >
    `;

});

    document.getElementById("contenedorImagenes").innerHTML = html;

    document.getElementById("modalImagenes").style.display = "block";
}

function mostrar(id){

    document.querySelectorAll(".seccion").forEach(sec => {
        sec.style.display = "none";
    });

    const seccion = document.getElementById(id);

    if(!seccion){
        console.error("No existe el elemento:", id);
        return;
    }

    seccion.style.display = "block";

    if(id === "verppm"){
        cargarPPM();
    }
}

function toggleSidebar(){
    document.getElementById('sidebar')
            .classList.toggle('collapsed');
}

function filtrarPPM(){

    const texto =
        document
        .getElementById("buscarEmpleado")
        .value
        .toLowerCase();

    const filtrados =
        listaPPM.filter(ppm => {

            const empleado =
                String(ppm.empleado || "")
                .toLowerCase();

            const nombre =
                String(ppm.nombre || "")
                .toLowerCase();

            return (
                empleado.includes(texto) ||
                nombre.includes(texto)
            );
        });

    mostrarTablaFiltrada(filtrados);
}

function mostrarTablaFiltrada(datos){

    let html = "";

    datos.forEach(ppm => {

        html += `
        <tr>

            <td>${ppm.id}</td>
            <td>${ppm.empleado}</td>
            <td>${ppm.nombre}</td>
            <td>${ppm.area}</td>
            <td>${ppm.fecha}</td>
            <td>${ppm.proceso_afectado}</td>
            <td>${ppm.delivery_to}</td>
            <td>${ppm.codigo}</td>
            <td>${ppm.supervisor_originador}</td>
            <td>${ppm.empleado_reporta}</td>
            <td>${ppm.turno_reporta}</td>
            <td>${ppm.titulo}</td>

            <td>
                ${ppm.imagen_url
                    ? "📷 Evidencia"
                    : "Sin evidencia"}
            </td>

            <td>

                <button
                    class="btn-ver"
                    onclick="verPPM(${ppm.id})">
                    Ver
                </button>

                <button
                    class="btn-delete"
                    onclick="eliminarPPM(${ppm.id})">
                    Eliminar
                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("listaPPM").innerHTML =
        html;
}

function cerrarSesion(){

    if(confirm("¿Deseas cerrar sesión?")){
        window.location.href = "index.html";
    }

}

async function guardarPPM() {

const archivos =
    document.getElementById("imagenes").files;

let imagenes = [];

for (const archivo of archivos) {

    const nombreArchivo =
        Date.now() + "_" + archivo.name;

    const { error: errorSubida } =
        await supabaseClient.storage
            .from("ppm-imagenes")
            .upload(nombreArchivo, archivo);

    if (errorSubida) {
        console.error(errorSubida);
        alert("Error al subir imagen");
        return;
    }

    const { data } =
        supabaseClient.storage
            .from("ppm-imagenes")
            .getPublicUrl(nombreArchivo);

    imagenes.push(data.publicUrl);
}
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
            document.getElementById("descripcion").value,

        imagen_url:
            JSON.stringify(imagenes)
    };

    console.log(ppm);

    const { error } =
        await supabaseClient
            .from("ppm")
            .insert([ppm]);

    if (error) {
        console.error(error);
        alert("Error al guardar PPM");
        return;
    }

    alert("PPM guardado correctamente");

    limpiarFormulario();
    cargarPPM();
}

async function cargarPPM() {

    const { data, error } = await supabaseClient
        .from("ppm")
        .select("*")
        .order("id", {
            ascending: false
        });

    if (error) {
        console.error(error);
        return;
    }

    // Guardar los registros para usar en verPPM()
    listaPPM = data;

    let html = "";

    data.forEach(ppm => {

        let botonEliminar = "";

        if (esAdmin()) {
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
            <td>${ppm.proceso_afectado}</td>
            <td>${ppm.delivery_to}</td>
            <td>${ppm.codigo}</td>
            <td>${ppm.supervisor_originador}</td>
            <td>${ppm.empleado_reporta}</td>
            <td>${ppm.turno_reporta}</td>
            <td>${ppm.titulo}</td>
            <td>${ppm.imagen_url ? "Evidencia" : "Sin Evidencia"}</td>

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

    document.getElementById("listaPPM").innerHTML = html;}


function cerrarModal(){

    document.getElementById("modalPPM")
            .style.display = "none";

}

async function eliminarPPM(id){

    const confirmar = confirm(
        "¿Deseas eliminar el registro #" + id + "?"
    );

    if(!confirmar){
        return;
    }

    const { error } = await supabaseClient
        .from("ppm")
        .delete()
        .eq("id", id);

    if(error){
        console.error(error);
        alert("Error al eliminar el registro");
        return;
    }

    alert("Registro eliminado correctamente");

    cargarPPM();
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

async function cargarQRQC(){

    const id =
        document.getElementById("buscarPPM").value;

    const { data, error } =
        await supabaseClient
            .from("ppm")
            .select("*")
            .eq("id", id)
            .single();

const { data: detalle, error: detalleError } = await supabaseClient
    .from('qrqc_detalle')
    .select('*')
    .eq('qrqc_id', data.id)
    .single();

if (detalle) {

    document.getElementById("what_happen").value =
        detalle.what_happen || "";

    document.getElementById("why_problem").value =
        detalle.why_problem || "";

    document.getElementById("when_detected").value =
        detalle.when_detected || "";

    document.getElementById("who_detected").value =
        detalle.who_detected || "";

    document.getElementById("where_detected").value =
        detalle.where_detected || "";

    document.getElementById("how_detected").value =
        detalle.how_detected || "";

    document.getElementById("how_many").value =
        detalle.how_many || "";

    document.getElementById("action_corrective_1").value =
        detalle.action_corrective_1 || "";
 
    document.getElementById("responsible_1").value =
        detalle.responsible_1 || "";

    document.getElementById("date_1").value =
        detalle.date_1 || "";

    document.getElementById("where_1").value =
        detalle.where_1 || "";
}

    if(error){

        alert("PPM no encontrado");
        return;

    }

    document.getElementById("qrqc_id")
        .textContent = data.id;

    document.getElementById("qrqc_date")
    .textContent =
    data.fecha_registro.split("T")[0];

    document.getElementById("qrqc_codigo")
        .textContent = data.codigo;

    document.getElementById("qrqc_delivery")
        .textContent = data.delivery_to;

    document.getElementById("qrqc_empleado")
        .textContent = data.empleado;

    document.getElementById("qrqc_turno")
        .textContent = data.turno_reporta;

    document.getElementById("qrqc_area")
        .textContent = data.area;

    document.getElementById("qrqc_reporte")
        .textContent = data.empleado_reporta;

    document.getElementById("qrqc_hallazgo")
        .textContent = data.titulo;
}

async function guardarQRQC() {

    const qrqcId =
        document.getElementById("qrqc_id").textContent;

const datos = {

    qrqc_id: Number(qrqcId),

    what_happen:
        document.getElementById("what_happen").value,

    why_problem:
        document.getElementById("why_problem").value,

    when_detected:
        document.getElementById("when_detected").value,

    who_detected:
        document.getElementById("who_detected").value,

    where_detected:
        document.getElementById("where_detected").value,

    how_detected:
        document.getElementById("how_detected").value,

    how_many:
        document.getElementById("how_many").value,

    action_corrective_1:
        document.getElementById("action_corrective_1").value,
    action_corrective_2:
        document.getElementById("action_corrective_2").value,

    responsible_1:
        document.getElementById("responsible_1").value,
    responsible_2:
        document.getElementById("responsible_2").value,

    where_1:
        document.getElementById("where_1").value,

    date_1:
        document.getElementById("date_1").value|| null,
    date_2:
        document.getElementById("date_2").value|| null,
    date_3:
        document.getElementById("date_3").value|| null,
    date_4:
        document.getElementById("date_4").value|| null,
    date_5:
        document.getElementById("date_5").value|| null,
    date_6:
        document.getElementById("date_6").value|| null,


};

const { data, error } = await supabaseClient
    .from('qrqc_detalle')
    .upsert(datos, {
        onConflict: 'qrqc_id'
    });

    if(error){

        alert(error.message);

    }else{

        alert("Información guardada");
    }
}

function limpiarQRQC() {

    document.getElementById("qrqc_id").textContent = "";
    document.getElementById("qrqc_date").textContent = "";
document.getElementById("qrqc_codigo").textContent = "";
document.getElementById("qrqc_delivery").textContent = "";
document.getElementById("qrqc_empleado").textContent = "";
document.getElementById("qrqc_turno").textContent = "";
document.getElementById("qrqc_area").textContent = "";
document.getElementById("qrqc_reporte").textContent = "";
document.getElementById("qrqc_hallazgo").textContent = "";

    document.getElementById("what_happen").value = "";
    document.getElementById("why_problem").value = "";
    document.getElementById("when_detected").value = "";
    document.getElementById("who_detected").value = "";
    document.getElementById("where_detected").value = "";
    document.getElementById("how_detected").value = "";
    document.getElementById("how_many").value = "";

    document.getElementById("action_corrective_1").value = "";
    document.getElementById("action_corrective_2").value = "";
    document.getElementById("action_corrective_3").value = "";
    document.getElementById("action_corrective_4").value = "";
    document.getElementById("action_corrective_5").value = "";
    document.getElementById("action_corrective_6").value = "";

    document.getElementById("responsible_1").value = "";
    document.getElementById("responsible_2").value = "";
    document.getElementById("responsible_3").value = "";
    document.getElementById("responsible_4").value = "";
    document.getElementById("responsible_5").value = "";
    document.getElementById("responsible_6").value = "";

    document.getElementById("date_1").value = "";
    document.getElementById("date_2").value = "";
    document.getElementById("date_3").value = "";
    document.getElementById("date_4").value = "";
    document.getElementById("date_5").value = "";
    document.getElementById("date_6").value = "";

    document.getElementById("where_1").value = "";
    document.getElementById("where_2").value = "";
    document.getElementById("where_3").value = "";
    document.getElementById("where_4").value = "";
    document.getElementById("where_5").value = "";
    document.getElementById("where_6").value = "";

}

function mostrarQR(){

    const ppmId =
        document.getElementById("empleado").value || "nuevo";

    const urlSubida =
        `https://thediablo20.github.io/PPMs.github.io/upload.html?id=${ppmId}`;

    const qr =
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(urlSubida)}`;

    document.getElementById("contenedorQR").innerHTML = `
        <h3>Escanea este QR</h3>

        ${qr}

        <p>
            Usa tu teléfono para subir evidencias.
        </p>
    `;
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

