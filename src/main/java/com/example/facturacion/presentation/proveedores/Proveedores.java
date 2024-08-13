package com.example.facturacion.presentation.proveedores;

import com.example.facturacion.data.ProveedorRepository;
import com.example.facturacion.logic.Producto;
import com.example.facturacion.logic.Proveedor;
import com.example.facturacion.logic.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/proveedores")
public class Proveedores {
    @Autowired
    Service service;

    @GetMapping
    public Iterable<Proveedor> read() {
        return service.findAllProveedores();
    }

    @PostMapping("/{id}")
    public void activarDesactivar(@PathVariable int id) {
        try {
            service.updateEstado(id);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado", ex);
        }
    }

    @GetMapping("/search")
    public Proveedor findByNombre(@RequestParam String usuarioId) {
            return  service.findProveedorByUsuarioId(usuarioId);
    }


}
