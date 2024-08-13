package com.example.facturacion.presentation.facturacion;

import com.example.facturacion.logic.Detalle;
import com.example.facturacion.logic.DetalleDTO;

import java.math.BigDecimal;
import java.util.List;

public class FacturaDTO {
    private int clienteId;
    private int proveedorId;
    private List<DetalleDTO> detalles;

    public FacturaDTO() {
        this   .clienteId = 0;
        this.proveedorId = 0;
        this.detalles = null;
    }

    public FacturaDTO(int clienteId, int proveedorId, List<DetalleDTO> detalles) {
        this.clienteId = clienteId;
        this.proveedorId = proveedorId;
        this.detalles = detalles;
    }

    public int getClienteId() {
        return clienteId;
    }

    public void setClienteId(int clienteId) {
        this.clienteId = clienteId;
    }

    public int getProveedorId() {
        return proveedorId;
    }

    public void setProveedorId(int proveedorId) {
        this.proveedorId = proveedorId;
    }

    public List<DetalleDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleDTO> detalles) {
        this.detalles = detalles;
    }
}
