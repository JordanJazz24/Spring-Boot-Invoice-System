drop DATABASE Facturacion;
CREATE DATABASE Facturacion;
USE Facturacion;

-- Creación de la tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    rol ENUM('admin', 'proveedor') DEFAULT 'PROVEEDOR' NOT NULL
);

-- Creación de la tabla Proveedor
CREATE TABLE IF NOT EXISTS Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    estado ENUM('activo', 'inactivo') DEFAULT 'inactivo' NOT NULL,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);

-- Creación de la tabla Cliente
CREATE TABLE IF NOT EXISTS Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    id_proveedor INT,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id)	
);

-- Creación de la tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(100) UNIQUE,
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    id_proveedor INT,
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id)
);

-- Creación de la tabla Factura
CREATE TABLE IF NOT EXISTS Factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_proveedor INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id)
);

-- Creación de la tabla Detalle
CREATE TABLE IF NOT EXISTS Detalle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura INT,
    id_producto INT,
    cantidad INT,
    monto_total DECIMAL(10, 2),
    FOREIGN KEY (id_factura) REFERENCES Factura(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);


-- Inserción de ejemplo en la tabla Usuario
INSERT INTO Usuario (identificacion, contrasena, rol) VALUES ('admin', '{bcrypt}$2a$10$bxNZGx87dliNGwu52wFt7ORma1M1Vp8bz53rBnSthftyVJWgNZkba', 'admin');
INSERT INTO Usuario (identificacion, contrasena, rol) VALUES ('jordan', '{bcrypt}$2a$10$eyTn0e54UhvsFBZXH4/34uqSQLFP.NLeUjI.HwVo7H2ufHzmTpfyy', 'proveedor');
INSERT INTO Usuario (identificacion, contrasena, rol) VALUES ('jsoto', '{bcrypt}$2a$10$eyTn0e54UhvsFBZXH4/34uqSQLFP.NLeUjI.HwVo7H2ufHzmTpfyy', 'proveedor');

-- Inserción de ejemplo en la tabla Proveedor
INSERT INTO Proveedor (nombre, estado, id_usuario) VALUES ('Informatica jordan', 'activo', 2);
INSERT INTO Proveedor (nombre, estado, id_usuario) VALUES ('panaderia de jose', 'activo', 3);

-- Inserción de ejemplo en la tabla Cliente
INSERT INTO Cliente (identificacion, nombre, correo, telefono, id_proveedor) VALUES ('jaky24', 'Jacky sieras', 'cliente1@example.com', '123456789', 1);
INSERT INTO Cliente (identificacion, nombre, correo, telefono, id_proveedor) VALUES ('pepe22', 'Pepe carvajal', 'cliente2@example.com', '987654321', 1);

-- Inserción de ejemplo en la tabla Producto
INSERT INTO Producto (codigo, nombre, descripcion, precio, id_proveedor) VALUES ('P001', 'Producto 1', 'Descripción del Producto 1', 100.00, 1);
INSERT INTO Producto (codigo, nombre, descripcion, precio, id_proveedor) VALUES ('P002', 'Producto 2', 'Descripción del Producto 2', 150.00, 1);
INSERT INTO Producto (codigo, nombre, descripcion, precio, id_proveedor) VALUES ('P003', 'Producto 3', 'Descripción del Producto 3', 150.00, 2);


-- Inserción de ejemplo en la tabla Factura
INSERT INTO Factura (id_cliente, id_proveedor) VALUES (1, 1);
INSERT INTO Factura (id_cliente, id_proveedor) VALUES (2, 1);

-- Inserción de ejemplo en la tabla Detalle
INSERT INTO Detalle (id_factura, id_producto, cantidad, monto_total) VALUES (1, 1, 2, 200.00);
INSERT INTO Detalle (id_factura, id_producto, cantidad, monto_total) VALUES (2, 2, 1, 150.00);


select * from Usuario;
select * from Proveedor;
select * from Cliente;
select * from Producto;
select * from Factura;
select * from Detalle;
