CREATE DATABASE IF NOT EXISTS restaurante_db;

USE restaurante_db;

/* 
	CREACIÓN DE TABLA: MESA
    LLAVE PRIMARIA: Número de mesa (mes_num).
		TIPO: NATURAL.
			EXPLICACIÓN: En un restaurante físicamente pueden encontrarse con números
						 para identificar fácilmente las mesas y atender las órdenes 
                         de forma más eficiente.
*/
CREATE TABLE IF NOT EXISTS mesa(
	mes_num INT NOT NULL,
    mes_capacidad INT NOT NULL,
    mes_sala ENUM('Interior', 'Exterior', 'Terraza') NOT NULL,
    PRIMARY KEY (mes_num)
);

/* 
	CREACIÓN DE TABLA: MESERO
	LLAVE PRIMARIA: Número de mesero (mese_num)
		TIPO DE LLAVE: Natural.
			EXPLICACIÓN: De la misma forma en que podemos encontrar alumnos con sus
						 respectivos NUA podemos encontrar en restaurantes lo mismo 
						 con meseros, es más sencillo identificarlos por una número
						 ó clave, este número también es útil para temas externos a
						 la aplicación (trámites por ejemplo).
*/
CREATE TABLE IF NOT EXISTS mesero(
	mese_num INT NOT NULL,
    mese_nombre VARCHAR(45) NOT NULL,
    mese_salario DECIMAL(6,2) NOT NULL,
    mese_dia SET('Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom') NOT NULL,
    mese_turno ENUM('Matutino', 'Vespertino', 'Completo') NOT NULL,
    PRIMARY KEY (mese_num)
);

/* 
	CREACIÓN DE TABLA: ORDEN
    LLAVE PRIMARIA: Número de orden (ord_num).
		TIPO DE LLAVE: Artifical.
			EXPLICACIÓN: Debido a la alta cantidad de órdenes se requiere un
						 número auto-incremental para un manejo más sencillo
                         de los registros dentro de la tabla.
*/
CREATE TABLE IF NOT EXISTS orden(
	ord_num INT NOT NULL AUTO_INCREMENT,
    ord_mes_num INT NOT NULL,
    ord_mese_num INT NOT NULL,
    ord_fecha DATE NOT NULL,
    ord_activo ENUM('Abierta','Pagada') NOT NULL,
    PRIMARY KEY (ord_num),
    CONSTRAINT fk_mesa_orden
		FOREIGN KEY(ord_mes_num)
        REFERENCES mesa(mes_num)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	CONSTRAINT fk_mesero_orden
		FOREIGN KEY (ord_mese_num)
        REFERENCES mesero(mese_num)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* 
	CREACIÓN DE TABLA: COMIDA
    LLAVE PRIMARIA: Código de comida (com_codigo).
		TIPO DE LLAVE: Artificial.
			EXPLICACIÓN: Asignar un código/clave a un platillo en 
						 específico facilita a los trabajadores el
                         cambio de información durante la jornada y
                         optimiza el manejo de la base.
*/
CREATE TABLE IF NOT EXISTS comida(
	com_codigo INT NOT NULL,
    com_nombre VARCHAR(45) NOT NULL,
    com_categoria ENUM('Ensalada', 'Sopa', 'Carne', 'Pescado', 'Postre') NOT NULL,
    com_precio DECIMAL(6,2) NOT NULL,
    com_descripcion TEXT NOT NULL,
    PRIMARY KEY (com_codigo)
);

/* 
	CREACIÓN DE TABLA: COMIDA_ORDEN
    LLAVE PRIMARIA: co_ord_num & co_com_codigo.
		TIPO DE LLAVE: COMPUESTA.
			EXPLICACIÓN: Para relacionar la comida en cada orden
						 se requiere tener el código de la comida
                         y el número de orden formando así una
                         relación muchos a muchos.
*/
CREATE TABLE IF NOT EXISTS comida_orden(
	co_ord_num INT,
    co_com_codigo INT,
    co_notas TEXT,
    co_cantidad INT NOT NULL,
    PRIMARY KEY (co_ord_num, co_com_codigo),
    CONSTRAINT fk_orden_comida_orden
		FOREIGN KEY (co_ord_num)
        REFERENCES orden(ord_num)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_comida_comida_orden
		FOREIGN KEY (co_com_codigo)
        REFERENCES comida(com_codigo)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* 
	CREACIÓN DE TABLA: BEBIDA
    LLAVE PRIMARIA: Código de bebida(beb_codigo).
		TIPO DE LLAVE: Artificial.
			EXPLICACIÓN: Asignar un código/clave a una bebida en 
						 específico facilita a los trabajadores el
                         cambio de información durante la jornada y
                         optimiza el manejo de la base.
*/
CREATE TABLE IF NOT EXISTS bebida(
	beb_codigo INT NOT NULL,
    beb_nombre VARCHAR(45) NOT NULL,
    beb_categoria ENUM('Refresco', 'Agua', 'Cerveza', 'Cafe') NOT NULL,
    beb_tamanio ENUM('Chico','Mediano','Grande') NOT NULL,
    beb_precio DECIMAL(6,2) NOT NULL,
    beb_descripcion TEXT NOT NULL,
    PRIMARY KEY (beb_codigo)
);

/* 
	CREACIÓN DE TABLA: BEBIDA_ORDEN
    LLAVE PRIMARIA: bo_ord_num & bo_beb_codigo.
		TIPO DE LLAVE: COMPUESTA.
			EXPLICACIÓN: Para relacionar las bebidas en cada orden
						 se requiere tener el código de las bebidas
                         y el número de orden formando así una
                         relación muchos a muchos.
*/

CREATE TABLE IF NOT EXISTS bebida_orden(
	bo_ord_num INT,
    bo_beb_codigo INT,
    bo_notas TEXT,
    bo_cantidad INT NOT NULL,
    PRIMARY KEY (bo_ord_num, bo_beb_codigo),
    CONSTRAINT fk_orden_bebida_orden
		FOREIGN KEY (bo_ord_num)
        REFERENCES orden(ord_num)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	CONSTRAINT fk_bebida_bebida_orden
		FOREIGN KEY (bo_beb_codigo)
        REFERENCES bebida(beb_codigo)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO mesero(mese_num, mese_nombre, mese_salario, mese_dia, mese_turno)
	VALUES (001,'Gael Morales',100.00,'Lun,Mar,Sab','Matutino'),
			(002,'Javier Ledesma',950.00,'Lun,Mar,Mie,Jue,Vie,Sab','Matutino'),
            (003,'Daniel Anda',500.0,'Lun,Mar','Vespertino'),
            (004,'Abraham Ponce',800.01,'Lun,Mar','Vespertino'),
            (005,'Fernando Vargas',10.00,'Lun,Mie,Vie','Completo'),
            (006,'Rogelio Manríquez',1.00,'Lun,Mar,Mie,Jue,Vie','Completo'),
            (007,'Misael Ramírez',8000.00,'Lun','Vespertino'),
            (008,'Aldo Isaac Hernández Antonio',1000.00,'Lun,Mar','Completo'),
            (009,'Sergio Ocampo Yancort',1000.00,'Lun,Mar','Completo'),
            (010,'Carlos Gómez Carranza',8000.50,'Lun,Mar,Mie','Matutino');
    
INSERT INTO mesa(mes_num, mes_capacidad, mes_sala)
	VALUES	(001, 10,'Interior'),
				(002, 8,'Exterior'),
                (003, 4,'Terraza'),
                (004, 2,'Interior'),
                (005, 6,'Exterior'),
                (006, 5,'Terraza');
                
INSERT INTO comida (com_codigo, com_nombre, com_categoria, com_precio, com_descripcion)
			VALUES (001,'Hamburguesa','Carne',55,'Hamburguesa con papas'),
					(002,'Pizza','Postre',44,'Pepperoni y jamón'),
                    (003,'Ensalada de pollo','Ensalada',33,'Mayonesa y crema con verduras.'),
                    (004,'Tacos','Pescado',22,'Con salsa al gusto'),
					(005,'Carlota de limón','Postre',25,'Preparada con leche condensada'),
                    (006,'Pay de queso','Postre',25,'Con mermelada de zarzamora'),
                    (007,'Pay de queso','Postre',25,'Con mermelada de fresa'),
                    (008,'Flan napolitano','Postre',30,'Con miel de maple y fruta'),
                    (009,'Pastel de limón','Postre',35,'Rebanada de pastel de limon'),
                    (010,'Gelatina de mosaico','Postre',20,'Mosaico de gelatinas de todos los sabores'),
                    (011,'Ensalada con aderezo de cacahuate','Ensalada',35,'Preparada con media crema'),
                    (012,'Ensalada con vinagreta de mango','Ensalada',35,'Preparada con frutos rojos, lechuga y jugo maggi'),
                    (013,'Ensalada de pollo','Ensalada',40,'Con rebanadas de milanesa de pollo, verduras, vinagre de ajo y jugo maggi'),
                    (014,'Ensalada de pitahaya','Ensalada',40,'Preparada con espinacas, garbazos y trozos de pitahaya'),
                    (015,'Pechuga de pollo en salsa de jitomate','Carne',50,'Acompañado con pasta y albahaca'),
                    (016,'Cochinita pibil','Carne',40,'Tacos de lomo de cerdo, rebanadas de chile, pimientos y cebolla'),
                    (017,'Lasaña','Carne',60,'ligeras capas de arina rellenas de carne');
                    
INSERT INTO bebida (beb_codigo, beb_nombre, beb_categoria, beb_tamanio,beb_precio, beb_descripcion)
			VALUES (001,'Coca-cola','Refresco','Grande',20,'De plástico'),
					(002,'7up','Refresco','Chico',22,'De lata'),
                    (003,'Pepsi','Refresco','Mediano',18,'De vidrio'),
                    (004,'Expresso','Cafe','Grande',30,'Con azúcar extra'),
                    (005,'Corona-light','Cerveza','Mediano',40,'En tarro con hielo'),
                    (006,'Manzanita','Refresco','Grande',35,'Botella familiar'),
                    (007,'Agua ciel','Agua','Chico',15,'De plástico'),
                    (008,'Americano','Cafe','Grande',50,'Con galleta gratis');
 
INSERT INTO orden (ord_num, ord_mes_num, ord_mese_num, ord_fecha, ord_activo)
            VALUES (001,'001','001','2021-06-13','Abierta'),
                    (002,'002','003','2021-06-15','Abierta'),
                    (003,'003','005','2021-06-18','Abierta'),
                    (004,'004','007','2021-06-21','Pagada'),
                    (005,'005','009','2021-06-23','Pagada'),
                    (006,'006','010','2021-06-25','Pagada');

INSERT INTO comida_orden (co_ord_num, co_com_codigo, co_cantidad, co_notas)
            VALUES (001,'001','2','Sin cebolla'),
                    (001,'002','3','Con extra-queso'),
                    (002,'003','2','Con crotones'),
                    (002,'004','1','Con rompope'),
                    (003,'005','3','Con canela'),
                    (003,'006','2','Con extra-zarzamora'),
                    (004,'007','3','Con extra-fresa'),
                    (004,'008','4','Con extra-maple'),
                    (005,'009','2','NA'),
                    (005,'010','5','NA'),
                    (006,'011','2','Con crema entera'),
                    (006,'012','3','NA');
                    
INSERT INTO bebida_orden (bo_ord_num, bo_beb_codigo, bo_cantidad, bo_notas)
            VALUES  (001,'001','2','Con hielo extra'),
                    (001,'002','3','Sin hielo'),
                    (002,'003','1','Temperatura ambiente'),
                    (002,'004','3','Con poca azúcar'),
                    (003,'005','2','Con hielo extra'),
                    (003,'006','3','NA'),
                    (004,'007','4','Con hielo'),
                    (004,'008','2','Frío'),
                    (005,'001','3','Con popote'),
                    (005,'002','1','NA'),
                    (006,'003','2','NA'),
                    (006,'004','1','NA');
