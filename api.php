<?php

    header('Content-Type: application/json');

    include('loadcredentials.php');

    try {
        $dsn = "pgsql:host=:hostname;dbname=:dbname";
        $dsn = str_replace(":hostname",$config['db_host'],$dsn);
        $dsn = str_replace(":dbname",$config['db_name'],$dsn);
        $pdo = new PDO($dsn,$config['db_username'],$config['db_password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

        $action = $_GET['action'] ?? '';

        if($action == 'monedas') {
            echo json_encode(getMonedas($pdo));
        } else if ($action == 'bodegas') {
            echo json_encode(getBodegas($pdo));
        } else if ($action == 'sucursales' && isset($_GET['id_bodega'])) {
            echo json_encode(getSucursales($pdo,$_GET['id_bodega']));
        } else if ($action == 'checkproducto' && isset($_GET['codigoproducto'])) {
            $productoExiste = checkIfProductoExiste($pdo,$_GET['codigoproducto']);
            echo json_encode([
                'productoexiste' => $productoExiste
            ]);
        }

    } catch (PDOException $e) {
        echo "Error: ". $e->getMessage();
    }

    function getMonedas($pdo) {
        $stmt = $pdo->query("SELECT nombre, tag_moneda FROM monedas ORDER BY id_moneda");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getBodegas($pdo) {
        $stmt = $pdo->query("SELECT id_bodega, nombre, tag_nombre FROM bodegas ORDER BY id_bodega");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function getSucursales($pdo,$id_bodega) {
        $stmt = $pdo->prepare("SELECT nombre,tag_sucursal FROM sucursales WHERE id_bodega = ? ORDER BY id_sucursal");
        $stmt->execute([$id_bodega]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function checkIfProductoExiste($pdo, $codigo) {
        $stmt = $pdo->prepare("SELECT codigo from productos where codigo ilike ?");
        $stmt->execute([$codigo]);
        return count($stmt->fetchAll(PDO::FETCH_ASSOC)) != 0;
    }

    

