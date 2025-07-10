# Facturacion-CSR

**Autor:** [JordanJazz24](https://github.com/JordanJazz24)  
**Repositorio:** [Facturacion-CSR](https://github.com/JordanJazz24/Facturacion-CSR)  
**Lenguajes principales:** Java (Spring Boot), JavaScript  
**Base de datos:** MySQL  


---

## Descripción

Facturacion-CSR es una solución integral de facturación electrónica y gestión comercial, desarrollada con Java y Spring Boot, que implementa client-side rendering y persistencia con MySQL. El sistema permite la administración eficiente de usuarios, proveedores, clientes, productos y facturas, integrando seguridad mediante roles y autenticación.

La arquitectura modular y el uso de buenas prácticas de desarrollo garantizan la escalabilidad, robustez y facilidad de mantenimiento del sistema.

---

## Características principales

- **Gestión de usuarios con roles y autenticación:**  
  Seguridad basada en Spring Security, con almacenamiento seguro de contraseñas y roles diferenciados para usuarios y proveedores.

- **Administración de proveedores, clientes y productos:**  
  CRUD completo para todas las entidades del sistema, permitiendo búsquedas, modificaciones y eliminaciones eficientes.

- **Facturación electrónica:**  
  Generación y gestión de facturas con detalles asociados por cliente y proveedor.

- **Persistencia con MySQL:**  
  Todas las operaciones se realizan sobre una base de datos relacional, asegurando integridad y rendimiento.

- **API RESTful bien estructurada:**  
  Endpoints claros y documentados para consumir desde frontend o aplicaciones externas.

- **Client-side rendering:**  
  Interfaces de usuario modernas y dinámicas, facilitando la experiencia de usuario.

---

## Estructura del proyecto

```
src/
├── main/
│   ├── java/com/example/facturacion/
│   │   ├── data/          # Repositorios JPA (Usuarios, Proveedores, Clientes, Productos, Facturas, Detalles)
│   │   ├── logic/         # Lógica de negocio (Service, entidades)
│   │   ├── presentation/  # Controladores REST para cada entidad
│   │   ├── security/      # Seguridad y autenticación
│   │   └── FacturacionApplication.java # Entry point (Spring Boot)
│   └── resources/
│       └── static/        # Recursos estáticos y frontend
└── test/
    └── java/com/example/facturacion/
```

---

## Principales endpoints

### Usuarios y autenticación

- `/api/auth/login` — Inicio de sesión de usuarios
- `/api/usuarios` — CRUD de usuarios

### Proveedores

- `GET /api/proveedores` — Lista de proveedores
- `POST /api/proveedores/{id}` — Activar/desactivar proveedor
- `GET /api/proveedores/search?usuarioId=...` — Buscar proveedor por usuario

### Productos

- CRUD completo de productos
- Búsquedas y eliminación por código o proveedor

### Clientes

- CRUD completo de clientes
- Búsquedas por identificación, asociación a proveedores

### Facturas y detalles

- Gestión y consulta de facturas asociadas a proveedores
- Gestión de detalles por factura

---

## Seguridad

- Autenticación basada en Spring Security
- Implementación de UserDetailsService personalizado
- Manejo de roles y control de acceso por endpoint
- Contraseñas encriptadas con BCrypt

---

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/JordanJazz24/Facturacion-CSR.git
   cd Facturacion-CSR
   ```

2. **Configura la base de datos MySQL** (credenciales en `application.properties`).

3. **Construye el proyecto:**
   ```bash
   ./mvnw clean install
   ```

4. **Ejecuta la aplicación:**
   ```bash
   ./mvnw spring-boot:run
   ```
   La API estará disponible en `http://localhost:8080/`.

---

## Pruebas

El proyecto utiliza Spring Boot Test y JUnit como base para pruebas de integración y unitarias. Puedes extender los tests para cubrir todos los casos de uso críticos.

---

## Contribuciones

Las contribuciones son bienvenidas. Abre un issue o un pull request para sugerir mejoras o reportar problemas.

---

## Licencia

Este proyecto está bajo licencia MIT (adáptalo según tus necesidades).

---

## Contacto

Para dudas, sugerencias o soporte, contacta a [JordanJazz24](https://github.com/JordanJazz24).

---

**Facturacion-CSR demuestra una arquitectura limpia, patrones de diseño modernos y buenas prácticas en seguridad y desarrollo backend con Java y Spring Boot.**
