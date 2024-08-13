package com.example.facturacion.data;

import com.example.facturacion.logic.Factura;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, Integer>{
 @Modifying
 @Transactional
    @Query("SELECT c FROM Factura c WHERE c.proveedorByIdProveedor.id = ?1")
    Iterable<Factura> findByproveedorByIdProveedor(int id);


}
