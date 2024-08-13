var api = backend + '/facturacion';

var state = {
    list: [],
    item: {id: "", clienteByIdCliente: {}, proveedorByIdProveedor: {}},
};

document.addEventListener("DOMContentLoaded", loaded);
document.addEventListener("DOMContentLoaded", unloaded);

async function loaded(event) {
    try {
        await menu();
    } catch (error) {
        console.error(error);
        return;
    }


    state.item.clienteByIdCliente = JSON.parse(sessionStorage.getItem('cliente')) || {};
        state.list = JSON.parse(sessionStorage.getItem('detalles')) || [];

    if (state.item.clienteByIdCliente && state.item.clienteByIdCliente.nombre) {
        document.getElementById("clienteNombre").innerText = state.item.clienteByIdCliente.nombre;
    }

    await renderProductosList();

    document.getElementById("validarCliente").addEventListener("click", validarCliente);
    document.getElementById("guardarFactura").addEventListener("click", addFactura);
    document.getElementById("validarProducto").addEventListener("click", validarProducto);
}

async function unloaded(event) {
    if(document.visibilityState === 'hidden' && loginstate.logged){
        sessionStorage.setItem('cliente', JSON.stringify(state.item.clienteByIdCliente));
        sessionStorage.setItem('detalles', JSON.stringify(state.list));
    }
}

async function obtenerProveedor(usuarioId) {
    const request = new Request(backend + '/proveedores/search?usuarioId=' + usuarioId, {method: 'GET', headers: {}});

    try {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const proveedor = await response.json();
        if (proveedor && proveedor.nombre) {
            state.item.proveedorByIdProveedor = proveedor;
            document.getElementById("proveedorNombre").innerText = proveedor.nombre;
        }
    } catch (error) {
        console.error('Error fetching provider:', error);
    }
}

async function renderProductosList() {
    await obtenerProveedor(loginstate.user.identificacion);
    var listado = document.getElementById("detallesList");
    listado.innerHTML = "";
    state.list.forEach(item => renderProductosListItem(listado, item));
}

function renderProductosListItem(listado, item) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <td></td>
        <td>${item.cantidad}</td>
        <td>${item.descripcion}</td>
        <td>${item.precio}</td>
        <td>${item.montoTotal}</td>
        <td id='agregarMas'><img src='/images/agregarMas.png'></td>
        <td id='delete'><img src='/images/delete.png'></td>
        <td></td>
    `;

    tr.querySelector("#agregarMas").addEventListener("click", () => {
        addMore(item.id);
    });
    tr.querySelector("#delete").addEventListener("click", async () => {
        await remove(item.productoId);
    });
    listado.append(tr);
}

async function validarCliente() {
    var nombreBusqueda = document.getElementById("clienteIdentificacion").value;
    const request = new Request(backend + '/clientes/search?identificacion=' + nombreBusqueda, {method: 'GET', headers: {}});

    try {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const clienteArray = await response.json();
        if (clienteArray && clienteArray.length > 0) {
            const cliente = clienteArray[0]; // Accedemos al primer elemento del array
            if (cliente && cliente.nombre) {
                state.item.clienteByIdCliente = cliente;
                sessionStorage.setItem('cliente', JSON.stringify(cliente));
                document.getElementById("clienteNombre").innerText = cliente.nombre;
            }
        }
    } catch (error) {
        console.error('Error fetching client:', error);
    }
}


async function validarProducto() {
    var codigoBusqueda = document.getElementById("productoCodigo").value;
    const request = new Request(backend + '/productos/search?codigo=' + codigoBusqueda, {method: 'GET', headers: {}});

    try {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        const arrayProducto = await response.json();
        const producto = arrayProducto[0];

        if (!producto) {
            console.error('Producto no encontrado');
            return;
        }

        // Buscar el producto en la lista de detalles
        const detalleExistente = state.list.find(detalle => detalle.productoId === producto.id);

        if (detalleExistente) {
            // Si el producto ya existe, actualizar cantidad y monto total
            detalleExistente.cantidad += 1;
            detalleExistente.montoTotal = detalleExistente.cantidad * detalleExistente.precio;
        } else {
            // Si el producto no existe, agregarlo a la lista
            const detalle = {
                productoId: producto.id,
                cantidad: 1,
                descripcion: producto.descripcion,
                precio: producto.precio,
                montoTotal: producto.precio,
            };
            state.list.push(detalle);
        }

        sessionStorage.setItem('detalles', JSON.stringify(state.list));
        await renderProductosList();
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

function addMore(productId) {
    // Logic for adding more of a specific product
}

async function remove(productId) {
    // Buscar el detalle con el productoId proporcionado
    const detalle = state.list.find(item => item.productoId === productId);

    if (detalle) {
        // Si la cantidad es mayor que 1, reducirla en 1
        if (detalle.cantidad > 1) {
            detalle.cantidad -= 1;
        } else {
            // Si la cantidad es 1, eliminar el detalle de state.list
            state.list = state.list.filter(item => item.productoId !== productId);
        }
    }

    // Actualizar el sessionStorage y volver a renderizar la lista de productos
    sessionStorage.setItem('detalles', JSON.stringify(state.list));
    await renderProductosList();
}

async function addFactura() {
    // Asigna los detalles a la factura antes de enviarla
    const factura = {
        clienteId: state.item.clienteByIdCliente.id,
        proveedorId: state.item.proveedorByIdProveedor.id,
        detalles: state.list
    };

    let request = new Request(api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(factura)
    });

    try {
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        alert("Factura guardada");
        // Limpia el sessionStorage y el estado después de guardar la factura
        sessionStorage.removeItem('cliente');
        sessionStorage.removeItem('detalles');
        state.item = {id: "", clienteByIdCliente: {}, proveedorByIdProveedor: {}};
        state.list = [];
        document.getElementById("clienteNombre").innerText = "...";
        await renderProductosList();
    } catch (error) {
        console.error('Error saving factura:', error);
    }
}

function errorMessage(status) {
    console.error('Error:', status);
}
