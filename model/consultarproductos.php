<?php 
    // ----- ----- Consulta de productos ----- -----
    require_once "Conexion.php";
    $conexion = new Conexion();
    $conexion->abrir();
    $productos = $conexion->obtenerProductos();
    $conexion->cerrar();
    /* ___________________________ */
    /* Con pdo ya se trae el todos los elementos de la consulta y no
    hay necesidad de recorrelo con un ciclo */
    $respuesta = array();
    if (count($productos) > 0) {
        $respuesta["productos"] = $productos;
        $respuesta["accion"] = 1;
    }else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "No se encontraron productos";
    }
    echo json_encode($respuesta);
    /* ______________________________________________________ */
    /* para revisar si está funcionando
    http://localhost/gestionProductoPDO/model/consultarproductos.php 
    {"productos":[{"id":"3","nombre":"pan","cantidad":"3"},{"id":"4","nombre":"huevo","cantidad":"2"},{"id":"5","nombre":"azucar","cantidad":"5"}],"accion":1}*/
?>