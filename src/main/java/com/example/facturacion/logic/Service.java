package com.example.facturacion.logic;

import com.example.facturacion.data.*;
import org.apache.tomcat.util.descriptor.web.InjectionTarget;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service("Service")
public class Service {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ProveedorRepository proveedorRepository;
    @Autowired
    private ClientesRepository clientesRepository;
    @Autowired
    private ProductosRepository productosRepository;
    @Autowired
    private FacturaRepository facturaRepository;
    @Autowired
    private DetalleRepository detalleRepository;


    public void updateEstado(int id) {
      proveedorRepository.updateEstado(id);
    }

    public Iterable<Proveedor> findAllProveedores() {
        return proveedorRepository.findAll();
    }
    public boolean isProveedorActivo(Usuario usuarioId) {
        Proveedor proveedor = proveedorRepository.findByusuario(usuarioId);
        if (proveedor != null) {
            boolean resultado = proveedor.getEstado().equals("activo");
            return resultado; // Asume que el estado activo se representa como "activo"
        }
        return false;
    }

    public Iterable<Producto> findAllProductos() {
        return productosRepository.findAll();
    }


    public List<Producto> findProductoByName(String nombre) {
        List<Producto> productos = productosRepository.findBycodigo(nombre);
        if (productos.isEmpty()) {
            return new ArrayList<>();
        }
        return productos;
    }

    public Producto findProductoById(int id) {

        Producto producto = productosRepository.findByid(id);
        return producto;
    }

    public void saveProducto(Producto producto) {
        productosRepository.save(producto);

    }

    public void deleteProducto(String cod) {
        productosRepository.deleteByCodigo(cod);
    }


    public Proveedor findProveedorById(int id) {
Proveedor proveedor = proveedorRepository.findByid(id);
        return proveedor;
    }

    public Proveedor findProveedorByUsuarioId(String usuarioId) {
        Usuario usuario = usuarioRepository.findByidentificacion(usuarioId);
        return proveedorRepository.findByusuario(usuario);
    }

    public Iterable<Producto> findProductosByProveedor(Proveedor proveedor) {
        return productosRepository.findByproveedorByIdProveedor(proveedor);
    }

    public Iterable<Cliente> findClientesByProveedor(Proveedor proveedor) {
        Iterable<Cliente> clientes = clientesRepository.findByproveedorByIdProveedor(proveedor);
            return clientes;
    }

    public List<Cliente> findClienteByIdentificacion(String identificacion) {
        List<Cliente> clientes = clientesRepository.findByidentificacion(identificacion);
        if (clientes.isEmpty()) {
            return new ArrayList<>();
        }
        return clientes;
    }

    public void saveCliente(Cliente cliente) {
        clientesRepository.save(cliente);
    }

    public void deleteCliente(String identificacion) {
        Cliente cliente = clientesRepository.findByidentificacion(identificacion).getFirst();
        clientesRepository.deleteDetallesByClienteId(cliente.getId());
        clientesRepository.deleteFacturasByClienteId(cliente.getId());
        clientesRepository.deleteByIdentificacion(identificacion);
    }

    public void updateUsuario(Usuario user) {
        usuarioRepository.updateIdentificacion(user.getIdentificacion(), user.getId());
        usuarioRepository.updateContrasena(user.getContrasena(), user.getId());
    }

    public void updateProveedorNombre(Proveedor proveedor) {
        proveedorRepository.updateNombre(proveedor.getNombre(), proveedor.getId());
    }


    public Cliente findClienteById(int clienteId) {
        Cliente cliente = clientesRepository.findByid(clienteId);
        return cliente;
    }

    public void saveFactura(Factura factura) {
        facturaRepository.save(factura);
    }

    public void saveDetalle(Detalle detalle) {
        detalleRepository.save(detalle);
    }

    public Iterable<Factura> findFacturasByIdProveedor(int id) {

    Iterable<Factura> facturas = facturaRepository.findByproveedorByIdProveedor(id);
        return facturas;
    }

    public Iterable<Detalle> findDetalleByIdFactura(int id) {
        Iterable<Detalle> detalles = detalleRepository.findByfacturaByIdFactura(id);
        return detalles;
    }
}
