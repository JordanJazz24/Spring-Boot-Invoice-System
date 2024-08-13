package com.example.facturacion.data;

import com.example.facturacion.logic.Proveedor;
import com.example.facturacion.logic.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Proveedor p SET p.estado = CASE p.estado WHEN 'activo' THEN 'inactivo' ELSE 'activo' END WHERE p.id = :id")
    void updateEstado(@Param("id") int id);

    Proveedor findByusuario(Usuario id);

    @Modifying
    @Transactional
    @Query("UPDATE Proveedor p SET p.nombre = ?1 WHERE p.id = ?2")
    void updateNombre(String nombre, int id);

    Proveedor findByid(int id);
}
