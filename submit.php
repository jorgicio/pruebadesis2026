<?php
    header('Content-Type: application/json');

    $json_data = file_get_contents('php://input');

    $data = json_decode($json_data, true);
    
    if(json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error at parsing JSON object'
        ]);
    }

    include('loadcredentials.php');

    if($data){
        try{
            $dsn = "pgsql:host=:hostname;dbname=:dbname";
            $dsn = str_replace(":hostname",$config['db_host'],$dsn);
            $dsn = str_replace(":dbname",$config['db_name'],$dsn);
            $pdo = new PDO($dsn,$config['db_username'],$config['db_password']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

            $query = "INSERT INTO productos (codigo,nombre,bodega,sucursal,precio,moneda,materiales";
            $query .= ",descripcion,id_bodega,id_sucursal) ";
            $query .= "SELECT ? as codigo, ? as nombre, b.nombre as bodega, s.nombre as sucursal,";
            $query .= "? as precio, ? as moneda, ARRAY[?] as materiales, ? as descripcion, ";
            $query .= "s.id_bodega, s.id_sucursal ";
            $query .= "FROM sucursales s JOIN bodegas b ON s.id_bodega = b.id_bodega ";
            $query .= "WHERE s.tag_sucursal = ? ";
            $materiales = implode(",",$data['materiales']);
            $params = [
                $data['codigo'],
                $data['nombre'],
                $data['precio'],
                $data['moneda'],
                $materiales,
                $data['descripcion'],
                $data['sucursal']
            ];
            
            $stmt = $pdo->prepare($query);
            $stmt->execute($params);
            
            echo json_encode([
                'status' => 'success', 
                'message' => 'Datos ingresados con éxito'
            ]);
        } catch (PDOException $e){
            echo json_encode([
                'status' => 'error', 
                'message' => 'Error en la conexión de la base de datos ' . $e->getMessage()
            ]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos']);
    }