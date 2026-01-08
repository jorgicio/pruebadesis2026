CREATE database pruebadesis2026;

CREATE USER mint WITH ENCRYPTED PASSWORD 'linuxmint2026';

-- Acá deben conectarse a la base de datos recién creada y usarla. También deberán darle permisos al nuevo usuario:
GRANT CONNECT ON DATABASE pruebadesis2026 TO mint;
GRANT ALL PRIVILEGES ON DATABASE pruebadesis2026 TO mint;
GRANT ALL ON SCHEMA public TO mint;