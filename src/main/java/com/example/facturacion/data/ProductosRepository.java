package com.example.facturacion.data;

import com.example.facturacion.logic.Producto;
import com.example.facturacion.logic.Proveedor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductosRepository extends CrudRepository<Producto, String>{


    List<Producto> findBycodigo(String nombre);


        @Modifying
        @Transactional
        @Query("DELETE FROM Producto p WHERE p.codigo = ?1")
        void deleteByCodigo(String cod);

    List<Producto> findByproveedorByIdProveedor(Proveedor proveedor);

    Producto findByid(int id);
}
