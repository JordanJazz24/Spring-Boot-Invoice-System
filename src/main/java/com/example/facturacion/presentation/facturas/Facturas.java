package com.example.facturacion.presentation.facturas;

import com.example.facturacion.logic.Detalle;
import com.example.facturacion.logic.Factura;
import com.example.facturacion.logic.Proveedor;
import com.example.facturacion.logic.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class Facturas {
    @Autowired
    Service service;

    @GetMapping
    public List<Detalle> readFacturas(@RequestParam String usuarioId) {
        Proveedor proveedor = service.findProveedorByUsuarioId(usuarioId);

        if (proveedor == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Proveedor no encontrado");
        }
        Iterable<Factura> facturas = service.findFacturasByIdProveedor(proveedor.getId());
        List<Detalle> detalles = new ArrayList<>(); // Inicializa la lista de detalles

        for (Factura factura : facturas) {
            Iterable<Detalle> detallesFactura = service.findDetalleByIdFactura(factura.getId());
            for (Detalle detalle : detallesFactura) {
                detalles.add(detalle); // Agrega cada detalle de la factura a la lista principal
            }
        }
        return detalles; // Devuelve la lista de detalles
    }
}