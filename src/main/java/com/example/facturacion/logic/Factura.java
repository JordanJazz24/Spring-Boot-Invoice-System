package com.example.facturacion.logic;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Factura {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Cliente clienteByIdCliente;
    @ManyToOne
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id")
    private Proveedor proveedorByIdProveedor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Factura factura = (Factura) o;
        return id == factura.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Cliente getClienteByIdCliente() {
        return clienteByIdCliente;
    }

    public void setClienteByIdCliente(Cliente clienteByIdCliente) {
        this.clienteByIdCliente = clienteByIdCliente;
    }

    public Proveedor getProveedorByIdProveedor() {
        return proveedorByIdProveedor;
    }

    public void setProveedorByIdProveedor(Proveedor proveedorByIdProveedor) {
        this.proveedorByIdProveedor = proveedorByIdProveedor;
    }
}
