DROP TABLE IF EXISTS roles_usur_admin CASCADE;
CREATE TABLE roles_usur_admin(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS roles_pas_cui CASCADE;
CREATE TABLE roles_pas_cui(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(120) NOT NULL, 
	lastname VARCHAR(120) NOT NULL,
	dni VARCHAR(120) NOT NULL,
	edad VARCHAR(120) NOT NULL,
	phone VARCHAR(80) NULL ,
	image VARCHAR(255) NULL,
	password VARCHAR (255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL
);

DROP TABLE IF EXISTS trabajador CASCADE;
CREATE TABLE trabajador(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(120) NOT NULL, 
	lastname VARCHAR(120) NOT NULL,
	dni VARCHAR(120) NOT NULL,
	edad VARCHAR(120) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR (255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	disponibilidad INT NULL,
	precio_x_hora_cuidado INT NULL,
	precio_x_hora_paseo INT NULL,
	direccion VARCHAR(255) NULL,
	distrito INT NULL,
	popularidad INT NULL,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(disponibilidad) REFERENCES dias_trabajo(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(distrito) REFERENCES distrito(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS distrito CASCADE;
CREATE TABLE distrito(
	id BIGSERIAL PRIMARY KEY,
	nombre_distrito VARCHAR(255) NOT NULL
);



DROP TABLE IF EXISTS dias_trabajo CASCADE;
CREATE TABLE dias_trabajo(
	id BIGSERIAL PRIMARY KEY,
	dia_trabajo VARCHAR(255) NOT NULL UNIQUE,
)




-- INSERT INTO users(
-- 	email,
-- 	name,
-- 	lastname,
-- 	dni,
--     edad,
-- 	password,
-- 	created_at,
-- 	updated_at
-- )
-- VALUES(
-- 	'ricardo@gmail.com',
-- 	'Ricardo',
-- 	'Gonzales',
-- 	'72177185',
--     '24',
-- 	'1234',
-- 	'2022-01-13',
-- 	'2022-01-13'
-- );

DROP TABLE IF EXISTS user_has_roles_usad CASCADE;
CREATE TABLE user_has_roles_usad(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles_usur_admin(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS trab_has_roles_pacu CASCADE;
CREATE TABLE trab_has_roles_pacu(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES trabajador(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles_pas_cui(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS perritos CASCADE;
CREATE TABLE perritos(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL, 
	descripcion VARCHAR(120) NOT NULL,
	raza VARCHAR(120) NOT NULL,
	edad VARCHAR(120) NOT NULL,
	image VARCHAR(255) NULL,
	id_user INT NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL
);

INSERT INTO roles_usur_admin(
	name,
	route,
	image,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'client/home',
	'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
	'2021-01-19',
	'2021-01-19'
);

INSERT INTO roles_pas_cui(
	name,
	route,
	image,
	created_at,
	updated_at
)
VALUES( 
	'PASEADOR',
	'restaurant/home',
	'https://www.gentedecanaveral.com/wp-content/uploads/2016/05/DATA_ART_8378410_VERTIL.jpg',
	'2021-01-19',
	'2021-01-19'
);

INSERT INTO roles_pas_cui(
	name,
	route,
	image,
	created_at,
	updated_at
)
VALUES( 
	'CUIDADOR',
	'delivery/home',
	'https://www.hola.com/imagenes/actualidad/20210226185127/lady-gaga-paseador-perros/0-924-458/ryan-fischer-ig-t.jpg',
	'2021-01-19',
	'2021-01-19'
);

INSERT INTO roles_usur_admin(
	name,
	route,
	image,
	created_at,
	updated_at
)
VALUES( 
	'ADMINISTRADOR',
	'delivery/home',
	'https://www.galileo.edu/trends-innovation/wp-content/uploads/2019/12/Lasi-Trab-Grande.jpg',
	'2021-01-19',
	'2021-01-19'
);