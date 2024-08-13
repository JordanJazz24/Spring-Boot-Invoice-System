package com.example.facturacion.presentation.login;

import com.example.facturacion.logic.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import com.example.facturacion.security.UserDetailsImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
@RestController
@RequestMapping("/api/login")
public class Login {
    @Autowired
    Service service;

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario form, HttpServletRequest request) throws ServletException {
        try {
            request.login(form.getIdentificacion(), form.getContrasena());
        } catch (ServletException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Authentication auth = (Authentication) request.getUserPrincipal();
        Usuario user = ((UserDetailsImp) auth.getPrincipal()).getUser();
        //verificar si el proveedor asociado al usuario esta activo
        if(user.getRol().equals("admin")){
            return new Usuario(user.getIdentificacion(), null, user.getRol());
        }
        if (!service.isProveedorActivo(user)) {
            request.logout();
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Proveedor no activo");
        }
        return new Usuario(user.getIdentificacion(), null, user.getRol());
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
        } catch (ServletException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al desloguear al usuario", e);
        }

    }

    @GetMapping("/current-user")
    public Usuario getCurrentUser(@AuthenticationPrincipal UserDetailsImp user) {
        return new Usuario(user.getUser().getIdentificacion(), null, user.getUser().getRol());
    }


    @GetMapping("/profile")
    public UserProfileDTO getUserProfile(@AuthenticationPrincipal UserDetailsImp userDetails) {
        Usuario user = userDetails.getUser();
            Proveedor proveedor = service.findProveedorByUsuarioId(user.getIdentificacion());
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setIdentificacion(user.getIdentificacion());
        userProfileDTO.setContrasena(user.getContrasena());
        userProfileDTO.setProveedorNombre(proveedor.getNombre());
        return userProfileDTO;
    }

    @PutMapping("/profile")
    public void updateUserProfile(@RequestBody UserProfileDTO userProfileDTO, @AuthenticationPrincipal UserDetailsImp userDetails, HttpServletRequest request) {
        Usuario user = userDetails.getUser();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setContrasena("{bcrypt}"+encoder.encode(userProfileDTO.getContrasena()));
        user.setIdentificacion(userProfileDTO.getIdentificacion());
        service.updateUsuario(user);

        Proveedor proveedor = service.findProveedorByUsuarioId(user.getIdentificacion());
        proveedor.setNombre(userProfileDTO.getProveedorNombre());
        service.updateProveedorNombre(proveedor);


    }

}
