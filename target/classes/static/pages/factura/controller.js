document.addEventListener("DOMContentLoaded", loaded);

var api = backend + '/facturas';

var state = {
    list: new Array(),
    // item: {id: "", proveedor: "", cliente: "", producto: "", descripcion: "", cantidad: "", total: ""}
};

async function loaded(event) {
    try {
        await menu();
    } catch (error) {
        return;
    }
    fetchAndList();
}

function fetchAndList() {
    const usuarioId = loginstate.user.identificacion;
    const request = new Request(api + `?usuarioId=${usuarioId}`, { method: 'GET', headers: {} });
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
    state.list.forEach(detalle => render_list_item(listado, detalle));
}

function render_list_item(listado, detalle) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
        <th></th>
        <td>${detalle.facturaByIdFactura.id}</td>
        <td>${detalle.facturaByIdFactura.proveedorByIdProveedor.nombre}</td>
        <td>${detalle.facturaByIdFactura.clienteByIdCliente.nombre}</td>
        <td>${detalle.productoByIdProducto.nombre}</td>
        <td>${detalle.productoByIdProducto.descripcion}</td>
        <td>${detalle.cantidad}</td>
        <td>${detalle.montoTotal}</td>
        <td id='pdf'><img src='/images/pdf.png'></td>
        <td id='xml'><img src='/images/xml.png'></td>
        <th></th>`;
    tr.querySelector("#pdf").addEventListener("click", () => {
        generatePDF(detalle);
    });
    tr.querySelector("#xml").addEventListener("click", () => {
        generateXML(detalle);
    });

    listado.append(tr);
}

function generatePDF(detalle) {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    doc.text(20, 20, 'Factura');
    doc.text(20, 30, `Proveedor: ${detalle.facturaByIdFactura.proveedorByIdProveedor.nombre}`);
    doc.text(20, 40, `Cliente: ${detalle.facturaByIdFactura.clienteByIdCliente.nombre}`);
    doc.text(20, 50, `Producto: ${detalle.productoByIdProducto.nombre}`);
    doc.text(20, 60, `Cantidad: ${detalle.cantidad}`);
    doc.text(20, 70, `Monto Total: ${detalle.montoTotal}`);

    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl);
}

function generateXML(detalle) {
    const xmlContent = `
    <Factura>
        <Id>${detalle.facturaByIdFactura.id}</Id>
        <Proveedor>${detalle.facturaByIdFactura.proveedorByIdProveedor.nombre}</Proveedor>
        <Cliente>${detalle.facturaByIdFactura.clienteByIdCliente.nombre}</Cliente>
        <Producto>${detalle.productoByIdProducto.nombre}</Producto>
        <Descripcion>${detalle.productoByIdProducto.descripcion}</Descripcion>
        <Cantidad>${detalle.cantidad}</Cantidad>
        <MontoTotal>${detalle.montoTotal}</MontoTotal>
    </Factura>`;

    const xmlBlob = new Blob([xmlContent], { type: 'application/xml' });
    const blobUrl = URL.createObjectURL(xmlBlob);
    window.open(blobUrl);
}
