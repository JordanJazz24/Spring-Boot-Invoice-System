package com.example.facturacion.data;

import com.example.facturacion.logic.Cliente;
import com.example.facturacion.logic.Proveedor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ClientesRepository extends CrudRepository<Cliente, String>{

    Iterable<Cliente> findByproveedorByIdProveedor(Proveedor proveedor);

    List<Cliente> findByidentificacion(String identificacion);


    @Modifying
    @Transactional
    @Query("DELETE FROM Cliente c WHERE c.identificacion = ?1")
    void deleteByIdentificacion(String identificacion);

    // Métodos adicionales para eliminar facturas y detalles relacionados
    @Modifying
    @Transactional
    @Query("DELETE FROM Detalle d WHERE d.facturaByIdFactura.id IN (SELECT f.id FROM Factura f WHERE f.clienteByIdCliente.id = ?1)")
    void deleteDetallesByClienteId(Integer clienteId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Factura f WHERE f.clienteByIdCliente.id = ?1")
    void deleteFacturasByClienteId(Integer clienteId);

    Cliente findByid(int clienteId);
}
