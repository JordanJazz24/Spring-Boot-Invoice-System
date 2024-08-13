package com.example.facturacion.presentation.facturacion;

import com.example.facturacion.logic.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.example.facturacion.presentation.facturacion.FacturaDTO;
import java.util.List;

@RestController
@RequestMapping("/api/facturacion")
public class Facturacion {

    @Autowired
    Service service;

    @PostMapping
    public void create(@RequestBody FacturaDTO facturaDTO) {
        try {
            // Crear la factura y establecer sus atributos
            Factura factura = new Factura();
            Cliente cliente = service.findClienteById(facturaDTO.getClienteId());
            Proveedor proveedor = service.findProveedorById(facturaDTO.getProveedorId());

            factura.setClienteByIdCliente(cliente);
            factura.setProveedorByIdProveedor(proveedor);
            service.saveFactura(factura);

            // Crear y guardar los detalles
            for (DetalleDTO detalleDTO : facturaDTO.getDetalles()) {
                Detalle detalle = new Detalle();
                detalle.setCantidad(detalleDTO.getCantidad());
                detalle.setMontoTotal(detalleDTO.getMontoTotal());
                detalle.setFacturaByIdFactura(factura);
                detalle.setProductoByIdProducto(service.findProductoById(detalleDTO.getProductoId()));
                service.saveDetalle(detalle);
            }
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, ex.getMessage());
        }
    }
}
