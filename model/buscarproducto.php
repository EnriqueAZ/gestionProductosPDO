<?php 
    // ----- ----- Buscar un producto ----- -----
    require_once "Conexion.php";
    $conexion = new Conexion;
    $conexion->abrir();
    $nombre = $_GET["nombre"];
    $producto = $conexion->obtenerProductoNombre($nombre); 
    $conexion->cerrar();
    $respuesta = array();
    if (count($producto) > 0) {
        $respuesta["productos"] = $producto;
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto encontrado";
    }else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "No se encontraron productos";
    }
    echo json_encode($respuesta);
?>



