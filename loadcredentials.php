<?php
    $config_path = './credenciales.ini';
    if(!file_exists($config_path)) {
        die("Archivo de configuración no encontrado en : $config_path");
    }

    $config = parse_ini_file($config_path);

    if(!$config || !isset($config['db_host']) || !isset($config['db_name']) 
        || !isset($config['db_username']) || !isset($config['db_password'])) {
            die("Faltan credenciales para la base de datos");
    }

    