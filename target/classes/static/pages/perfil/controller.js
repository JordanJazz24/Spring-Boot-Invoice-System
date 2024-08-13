var api = backend + '/login';

var state = {
    item: {identificacion: "", contrasena: "", proveedorNombre: ""},
};

document.addEventListener("DOMContentLoaded", loaded);

async function loaded(event) {
    try {
        await menu();
    } catch (error) {
        return;
    }
    document.getElementById("itemview").classList.toggle("active");

    await loadUserProfile();

    document.querySelector("#itemview #registrar").addEventListener("click", updateProfile);
    document.querySelector("#itemview #cancelar").addEventListener("click", toggle_itemview);
}

async function loadUserProfile() {
    let request = new Request(api + '/profile', {method: 'GET', headers: {}});
    const response = await fetch(request);
    if (!response.ok) {
        errorMessage(response.status);
        return;
    }
    state.item = await response.json();
    render_item();
}

function render_item() {
    document.getElementById("usuario").value = state.item.identificacion;
    document.getElementById("contrasena").value = state.item.contrasena;
    document.getElementById("nombre").value = state.item.proveedorNombre;
}

async function updateProfile() {
    load_item();
    if (!validate_item()) {
        return;
    }

    let request = new Request(api + '/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)
    });

    const response = await fetch(request);
    if (!response.ok) {
        errorMessage(response.status);
        return;
    }

    // Redirigir al usuario a la página de inicio de sesión después de la actualización
    logout();
}

function load_item() {
    state.item = {
        identificacion: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        proveedorNombre: document.getElementById("nombre").value,
    };
}

function validate_item() {
    var error = false;

    document.querySelectorAll('input').forEach((i) => {
        i.classList.remove("invalid");
    });

    // Validación de contrasena
    if (state.item.contrasena.trim() === "") {
        document.querySelector("#contrasena").classList.add("invalid");
        error = true;
    }

    // Validación de nombre de proveedor: solo debe contener letras
    if (!state.item.proveedorNombre.match(/^[a-zA-Z\s]+$/)) {
        document.querySelector("#nombre").classList.add("invalid");
        error = true;
    }

    return !error;
}

