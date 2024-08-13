package com.example.facturacion.data;

import com.example.facturacion.logic.Detalle;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DetalleRepository extends CrudRepository<Detalle, String>{

    @Modifying
    @Transactional
    @Query("SELECT c FROM Detalle c WHERE c.facturaByIdFactura.id = ?1")
    Iterable<Detalle> findByfacturaByIdFactura(int id);
}
