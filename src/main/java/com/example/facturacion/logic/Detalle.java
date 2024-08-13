package com.example.facturacion.logic;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class Detalle {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "cantidad")
    private Integer cantidad;
    @Basic
    @Column(name = "monto_total")
    private BigDecimal montoTotal;
    @ManyToOne
    @JoinColumn(name = "id_factura", referencedColumnName = "id")
    private Factura facturaByIdFactura;
    @ManyToOne
    @JoinColumn(name = "id_producto", referencedColumnName = "id")
    private Producto productoByIdProducto;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Detalle detalle = (Detalle) o;
        return id == detalle.id && Objects.equals(cantidad, detalle.cantidad) && Objects.equals(montoTotal, detalle.montoTotal);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, cantidad, montoTotal);
    }

    public Factura getFacturaByIdFactura() {
        return facturaByIdFactura;
    }

    public void setFacturaByIdFactura(Factura facturaByIdFactura) {
        this.facturaByIdFactura = facturaByIdFactura;
    }

    public Producto getProductoByIdProducto() {
        return productoByIdProducto;
    }

    public void setProductoByIdProducto(Producto productoByIdProducto) {
        this.productoByIdProducto = productoByIdProducto;
    }
}
