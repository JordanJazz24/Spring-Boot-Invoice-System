var api = backend + '/clientes';

var state = {
    list: new Array(),
    item: {identificacion: "", nombre: "", correo: "", telefono: ""},
    mode: "" // ADD, EDIT
};

document.addEventListener("DOMContentLoaded", loaded);

async function loaded(event) {
    try {
        await menu();
    } catch (error) {
        return;
    }

    document.getElementById("search").addEventListener("click", search);
    document.getElementById("new").addEventListener("click", ask);

    document.getElementById("itemoverlay").addEventListener("click", toggle_itemview);

    document.querySelector("#itemview #registrar").addEventListener("click", add);
    document.querySelector("#itemview #cancelar").addEventListener("click", toggle_itemview);

    fetchAndList();
}

function fetchAndList() {
    usuarioId = loginstate.user.identificacion;
    const request = new Request(api + `?usuarioId=${usuarioId}`, {method: 'GET', headers: {}});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        state.list = await response.json();
        render_list();
    })();
}

function render_list() {
    var listado = document.getElementById("list");
    listado.innerHTML = "";
    state.list.forEach(item => render_list_item(listado, item));
}

function render_list_item(listado, item) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
					<td id='add'><img src='/images/add.png'></td>
                    <td>${item.identificacion}</td>
					<td>${item.nombre}</td>
					<td>${item.correo}</td>
					<td>${item.telefono}</td>
					<td id='edit'><img src='/images/edit.png'></td>
                    <td id='delete'><img src='/images/delete.png'></td>
                    <th></th>`;
    tr.querySelector("#edit").addEventListener("click", () => {
        edit(item.identificacion);
    });
    tr.querySelector("#delete").addEventListener("click", () => {
        remove(item.identificacion);
    });
    tr.querySelector("#add").addEventListener("click", () => {
        addtoFacturaPage(item);
    });
    listado.append(tr);
}


function addtoFacturaPage(item) {
    //guarda el cliente seleccionado en el sessionStorage
    sessionStorage.setItem("cliente", JSON.stringify(item));
    window.location.href = "/pages/facturacion/View.html";
}

function search() {
    nombreBusqueda = document.getElementById("nombreBusqueda").value;
    const request = new Request(api + `/search?identificacion=${nombreBusqueda}`, {method: 'GET', headers: {}});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        state.list = await response.json();
        render_list();
    })();
}

function ask() {

    empty_item();
    toggle_itemview();
    state.mode = "ADD";
    render_item();
    document.getElementById("identificacion").style.display = "block";

}

function toggle_itemview() {
    document.getElementById("itemoverlay").classList.toggle("active");
    document.getElementById("itemview").classList.toggle("active");
}

function empty_item() {
    state.item = {identificacion: "", nombre: "", correo: "", telefono: ""};
}

function render_item() {
    document.querySelectorAll('#itemview input').forEach((i) => {
        i.classList.remove("invalid");
    });
    document.getElementById("identificacion").value = state.item.identificacion;
    document.getElementById("nombre").value = state.item.nombre;
    document.getElementById("correo").value = state.item.correo;
    document.getElementById("telefono").value = state.item.telefono;

    const registrarButton = document.querySelector("#itemview #registrar");

    if (state.mode === "ADD") {
        registrarButton.value = "Registrar";
    } else if (state.mode === "EDIT") {
        registrarButton.value = "Actualizar";
    }
}

function add() {
    load_item();
    if (!validate_item()) return;

    // Suponiendo que el usuarioId se obtiene de algún input en el formulario
    const usuarioId = loginstate.user.identificacion;

    let request = new Request(api + `?usuarioId=${usuarioId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.item)
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        toggle_itemview();
        fetchAndList();
    })();
}


function load_item() {
    state.item = {
        id:state.item.id,
        identificacion: document.getElementById("identificacion").value,
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
    };
}

function validate_item() {
    var error = false;

    document.querySelectorAll('input').forEach((i) => {
        i.classList.remove("invalid");
    });

    // Validación de identificacion: debe contener letras y/o números


    // Validación de nombre: solo debe contener letras
    if (!state.item.nombre.match(/^[a-zA-Z\s]+$/)) {
        document.querySelector("#nombre").classList.add("invalid");
        error = true;
    }

    // Validación de correo electrónico: debe seguir el formato estándar de un correo electrónico
    if (!state.item.correo.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        document.querySelector("#correo").classList.add("invalid");
        error = true;
    }

    // Validación de telefono: solo debe contener números
    if (!state.item.telefono.match(/^[0-9]+$/)) {
        document.querySelector("#telefono").classList.add("invalid");
        error = true;
    }

    return !error;
}


function edit(identificacion) {
    document.getElementById("identificacion").style.display = "hidden";

    let request = new Request(api + `/${identificacion}`, {method: 'GET', headers: {}});
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        state.item = await response.json();
        toggle_itemview();
        state.mode = "EDIT";
        render_item();
    })();
}

function remove(identificacion){
    let request = new Request(api + `/${identificacion}`, {
        method: 'DELETE',
        headers: {}
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        fetchAndList();
    })();
}

