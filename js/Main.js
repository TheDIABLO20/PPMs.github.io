const supabaseUrl =
"https://drxvkseiacmrzedbzysc.supabase.co";
const supabaseKey =
"sb_publishable_Al2Oh_KYr2JtXeqzrfxaKg__gVQmzg_";

const supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
async function login() {

    const usuario =
        document.getElementById("usuario").value.trim();

    const password =
        document.getElementById("password").value;

const { data, error } = await supabaseClient
    .from("usuarios")
    .select("*")
    .eq("empleado", usuario);

if (error || data.length === 0) {

    document.getElementById("error").style.display = "block";
    return;

}

const datos = data[0];

if (datos.password !== password) {

    document.getElementById("error").style.display = "block";
    return;

}

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
