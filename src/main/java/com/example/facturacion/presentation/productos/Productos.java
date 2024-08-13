package com.example.facturacion.presentation.productos;

import com.example.facturacion.logic.Producto;
import com.example.facturacion.logic.Proveedor;
import com.example.facturacion.logic.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/productos")
public class Productos {
    @Autowired
    Service service;

    @GetMapping
    public Iterable<Producto> readProductos(@RequestParam String usuarioId) {
        Proveedor proveedor = service.findProveedorByUsuarioId(usuarioId);
        if (proveedor == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
        }
        return service.findProductosByProveedor(proveedor);
    }

    @GetMapping("/{codigo}")
    public Producto read(@PathVariable String codigo) {
        try {
            return service.findProductoByName(codigo).getFirst();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public Iterable<Producto> findByNombre(@RequestParam String codigo) {
        if (codigo.isEmpty()) {
            return new ArrayList<>();
        }
        return service.findProductoByName(codigo);
    }

    @PostMapping
    public void create(@RequestBody Producto producto, @RequestParam String usuarioId) {
        try {
            Proveedor proveedor = service.findProveedorByUsuarioId(usuarioId);
            if (proveedor == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
            }
            producto.setProveedorByIdProveedor(proveedor);
            service.saveProducto(producto);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
        }
    }


    @DeleteMapping("/{codigo}")
    public void delete(@PathVariable String codigo) {
        try {
            service.deleteProducto(codigo);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
