# Spring-Boot-Invoice-System

**Lenguajes Principailes:** Java (Spring Boot), JavaScript -
**Date base:** mysql 


---

## Description

Spring-Boot-Invouize-System is an integral solution for electronic billing and commercial management, developed with Java and Spring Boot, which implements Client-Side Rendering and Persistence with MySQL. The system allows efficient administration of users, suppliers, customers, products and invoices, integrating safety through roles and authentication.

Modular architecture and the use of good development practices guarantee scalability, robustness and system maintenance ease.

---

## Main features

- **User management with roles and authentication:**
SPRING SECURITY BASED SAFETY, with safe password storage and differentiated roles for users and suppliers.

- **Administration of suppliers, customers and products:**
Complete CRUD for all system entities, allowing efficient searches, modifications and eliminations.

- **Electronic billing:**
Generation and management of invoices with details associated by customer and supplier.

- **Persistence with MySQL:**
All operations are carried out on a relational database, ensuring integrity and performance.

- **API restful well structured:**
Clear and documented endpoints to consume from Fronnd or external applications.

- **Client-side rendering:**
Modern and dynamic user interfaces, facilitating user experience.

---

## Project structure

```
SRC/
├── Main/
│ ├── Java/com/Example/invoice
│ │ ├ ├── Data/ # Repositorias JPA (Users, Provors, Customers, Products, Invoices, Dealles)
│ │ ├ ├── Logic/ # business logic (service, entities)
│ │ ├ ├── Presentation/ # REST Controllers for each ENTIDAD
│ │ ├ ├── SECURITY/ # SECURITY Y AUTENTICACIÓN
│ │ └ └── FacturacionApplication. Java # Entry Point (Spring Boot)
│ └── Resources/
│ └── STATIC/ # STATIC RESOURCES Y Fordrand
└── Test/
└── Java/com/Example/Facturacion
```

---

## Main Endpoints

### Users and authentication

- `/api/auth/login` — Inicio de sesión de usuarios
- `/api/usuarios` — CRUD de usuarios

### Providers

- `GET /api/proveedores` — Lista de proveedores
- `POST /api/proveedores/{id}` — Activar/desactivar proveedor
- `GET /api/proveedores/search?usuarioId=...` — Buscar proveedor por usuario

### Products

- Complete crud of products
- Searches and elimination by code or supplier

### Customers

- Complete CRUD OF CUSTOMERS
- Identification searches, association to suppliers

### Invoices and details

- Management and consultation of invoices associated with suppliers
- Detail management by invoice

---

## Security

- Spring Security -based authentication
- UserdetailService Personalized implementation
- Roles management and access control by Endpoint
- Passwords encrypted with BCRYPT

---

Installation and execution

1. **Clone the repository:**
`` Bash
GIT CLONE https://github.com/jordanjazz24/facturacion-csr.git
CD Billing-CSR
``

2. **Configure the MySQL** database (credentials in `Application.properties`).

3. **Build the project:**
`` Bash
./MVNW CLEAN INSTALL
``

4. **Execute the application:**
`` Bash
./MVNW Spring-Boot: Run
``
The API will be available at `http: // localhost: 8080/`.

---



