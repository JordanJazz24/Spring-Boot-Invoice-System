package com.example.facturacion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@SpringBootApplication
public class FacturacionApplication {

    public static void main(String[] args) { SpringApplication.run(FacturacionApplication.class, args);

    }


    @Bean("securityFilterChain")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        var chain = http
                .authorizeHttpRequests(customizer -> customizer
                        .requestMatchers("/api/login/login").permitAll()
                        .requestMatchers("/api/login/logout").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/**").hasAnyAuthority("admin","proveedor")
                        .requestMatchers(HttpMethod.DELETE,"/api/**").hasAnyAuthority("admin","proveedor")
                        .requestMatchers(HttpMethod.GET,"/api/**").hasAnyAuthority("admin","proveedor")
                        .requestMatchers("/**").permitAll()
                )
                .exceptionHandling(customizer -> customizer
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .csrf().disable()
                .build();
        return chain;
    }

}
