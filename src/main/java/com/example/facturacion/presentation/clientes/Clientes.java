package com.example.facturacion.presentation.clientes;

import com.example.facturacion.logic.Cliente;
import com.example.facturacion.logic.Proveedor;
import com.example.facturacion.logic.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/clientes")
public class Clientes {
    @Autowired
    Service service;

    @GetMapping
    public Iterable<Cliente> readClientes(@RequestParam String usuarioId) {
        Proveedor proveedor = service.findProveedorByUsuarioId(usuarioId);
        if (proveedor == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
        }
        return service.findClientesByProveedor(proveedor);
    }

    @GetMapping("/{identificacion}")
    public Cliente read(@PathVariable String identificacion) {
        try {
            return service.findClienteByIdentificacion(identificacion).getFirst();
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public Iterable<Cliente> findByNombre(@RequestParam String identificacion) {
        if (identificacion.isEmpty()) {
            return new ArrayList<>();
        }
            return service.findClienteByIdentificacion(identificacion);
    }

    @PostMapping
    public void create(@RequestBody Cliente cliente, @RequestParam String usuarioId) {
        try {
            Proveedor proveedor = service.findProveedorByUsuarioId(usuarioId);
            if (proveedor == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
            }
            cliente.setProveedorByIdProveedor(proveedor);
            service.saveCliente(cliente);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
        }
    }


    @DeleteMapping("/{identificacion}")
    public void delete(@PathVariable String identificacion) {
        try {
            service.deleteCliente(identificacion);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}
