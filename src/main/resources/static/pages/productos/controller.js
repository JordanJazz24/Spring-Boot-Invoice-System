var api = backend + '/productos';

var state = {
    list: new Array(),
    item: {codigo: "", nombre: "", descripcion: "", precio: ""},
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
                    <td>${item.codigo}</td>
					<td>${item.nombre}</td>
					<td>${item.descripcion}</td>
					<td>${item.precio}</td>
					<td id='edit'><img src='/images/edit.png'></td>
                    <td id='delete'><img src='/images/delete.png'></td>
                    <th></th>`;
    tr.querySelector("#edit").addEventListener("click", () => {
        edit(item.codigo);
    });
    tr.querySelector("#delete").addEventListener("click", () => {
        remove(item.codigo);
    });
    tr.querySelector("#add").addEventListener("click", () => {
       addtoFacturaPage(item);
    });
    listado.append(tr);
}

function addtoFacturaPage(producto) {
    // Cargar los detalles existentes desde el sessionStorage
    let detallesExistentes = sessionStorage.getItem('detalles');
    let detalles = [];

    if (detallesExistentes) {
        // Si hay detalles existentes, parsearlos
        detalles = JSON.parse(detallesExistentes);
    }

    // Crear el nuevo detalle del producto seleccionado
    const detalle = {
        productoId: producto.id,
        cantidad: 1,
        descripcion: producto.descripcion,
        precio: producto.precio,
        montoTotal: producto.precio,
    };

    // Añadir el nuevo detalle a la lista existente
    detalles.push(detalle);

    // Guardar la lista actualizada de detalles en el sessionStorage
    sessionStorage.setItem('detalles', JSON.stringify(detalles));

    // Redirigir a la página de facturación
    window.location.href = "/pages/facturacion/View.html";
}


function search() {
    nombreBusqueda = document.getElementById("nombreBusqueda").value;
    const request = new Request(api + `/search?codigo=${nombreBusqueda}`, {method: 'GET', headers: {}});
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
}

function toggle_itemview() {
    document.getElementById("itemoverlay").classList.toggle("active");
    document.getElementById("itemview").classList.toggle("active");
}

function empty_item() {
    state.item = {codigo: "", nombre: "", descripcion: "", precio: ""};
}

function render_item() {
    document.querySelectorAll('#itemview input').forEach((i) => {
        i.classList.remove("invalid");
    });
    document.getElementById("codigo").value = state.item.codigo;
    document.getElementById("nombre").value = state.item.nombre;
    document.getElementById("descripcion").value = state.item.descripcion;
    document.getElementById("precio").value = state.item.precio;

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

    const request = new Request(api + `?usuarioId=${usuarioId}`, {
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
        codigo: document.getElementById("codigo").value,
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
    };
}

function validate_item() {
    var error = false;

    document.querySelectorAll('input').forEach((i) => {
        i.classList.remove("invalid");
    });

    // Validación de codigo: debe contener letras y/o números
    if (!state.item.codigo.match(/^[a-zA-Z0-9]+$/)) {
        document.querySelector("#codigo").classList.add("invalid");
        error = true;
    }

    // Validación de nombre: solo debe contener letras
    if (!state.item.nombre.match(/^[a-zA-Z\s]+$/)) {
        document.querySelector("#nombre").classList.add("invalid");
        error = true;
    }

    // Validación de descripción: solo debe contener letras
    if (!state.item.descripcion.match(/^[a-zA-Z\s]+$/)) {
        document.querySelector("#descripcion").classList.add("invalid");
        error = true;
    }

    // Validación de precio: solo debe contener números
    if (!state.item.precio.match(/^[0-9]+$/)) {
        document.querySelector("#precio").classList.add("invalid");
        error = true;
    }

    return !error;
}

function edit(codigo) {
    let request = new Request(api + `/${codigo}`, {method: 'GET', headers: {}});
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

function remove(codigo){
    let request = new Request(api + `/${codigo}`, {
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

