-- Importante: Deben haber usado los comandos en el archivo createuser.sql antes de usar estas queries.
CREATE TABLE monedas (
	id_moneda SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	tag_moneda VARCHAR(100) NOT NULL
);

insert into monedas (nombre, tag_moneda) VALUES('Dólar (USD)','dolar');
insert into monedas (nombre, tag_moneda) VALUES('Peso Chileno (CLP)','pesochileno');
insert into monedas (nombre, tag_moneda) VALUES('Peso Argentino (ARS)','pesoargentino');
insert into monedas (nombre, tag_moneda) VALUES('Peso Mexicano (MXN)','pesomexicano');
insert into monedas (nombre, tag_moneda) VALUES('Dólar Australiano (AUD)','dolaraustraliano');
insert into monedas (nombre, tag_moneda) VALUES('Dólar Canadiense (CAD)','dolarcanadiense');
insert into monedas (nombre, tag_moneda) VALUES('Euro (EUR)','euro');

CREATE TABLE bodegas (
	id_bodega SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	tag_nombre VARCHAR(100) NOT NULL
);

insert into bodegas(nombre,tag_nombre) values ('Bodega 1','bodega1');
insert into bodegas(nombre,tag_nombre) values ('Bodega 2','bodega2');
insert into bodegas(nombre,tag_nombre) values ('Bodega 3','bodega3');
insert into bodegas(nombre,tag_nombre) values ('Bodega 4','bodega4');


CREATE TABLE sucursales (
	id_sucursal SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	tag_sucursal VARCHAR(100) NOT NULL,
	id_bodega INTEGER NOT NULL,
	FOREIGN KEY(id_bodega) REFERENCES bodegas(id_bodega) 
);

insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 1.1','sucursal11',1);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 1.2','sucursal12',1);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 2.1','sucursal21',2);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 2.2','sucursal22',2);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 2.3','sucursal23',2);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 3.1','sucursal31',3);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 3.2','sucursal32',3);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 3.3','sucursal33',3);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 4.1','sucursal41',4);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 4.2','sucursal42',4);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 4.3','sucursal43',4);
insert into sucursales(nombre,tag_sucursal,id_bodega) values ('Sucursal 4.4','sucursal44',4);

create table productos(
	id_producto SERIAL primary key,
	codigo VARCHAR(16) unique not NULL,
	nombre VARCHAR(100) not null,
	bodega VARCHAR(100) not null,
	sucursal VARCHAR(100) not null,
	moneda VARCHAR(100) not null,
	precio REAL not null,
	materiales TEXT[] not null,
	descripcion TEXT not null,
	id_bodega INTEGER not null,
	id_sucursal INTEGER not null,
	foreign key (id_bodega) references bodegas(id_bodega),
	foreign key (id_sucursal) references sucursales(id_sucursal)
);



