package com.example.facturacion.logic;

import java.math.BigDecimal;

public class DetalleDTO {
    private int productoId;
    private int cantidad;
    private BigDecimal montoTotal;

    // Getters y setters


    public DetalleDTO(int productoId, int cantidad, BigDecimal montoTotal) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.montoTotal = montoTotal;
    }

    public int getProductoId() {
        return productoId;
    }

    public void setProductoId(int productoId) {
        this.productoId = productoId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }
}
