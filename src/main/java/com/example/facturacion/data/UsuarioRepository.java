package com.example.facturacion.data;

import com.example.facturacion.logic.Usuario;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
    Usuario findByidentificacion(String identificacion);
    Usuario findByid(int id);
    @Modifying
    @Transactional
    @Query("UPDATE Usuario u SET u.identificacion = ?1 WHERE u.id = ?2")
    void updateIdentificacion(String identificacion, int id);

    @Modifying
    @Transactional
    @Query("UPDATE Usuario u SET u.contrasena = ?1 WHERE u.id = ?2")
    void updateContrasena(String contrasena, int id);


}
