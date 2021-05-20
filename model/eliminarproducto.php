<?php 
    // -----:::::----- Eliminar producto -----:::::-----
    require_once "Conexion.php";
    $conexion = new Conexion();
    $conexion->abrir();
    $id = $_GET["id"];
    /* $id = (int) $valor; */
    $respuesta = array();
    /* ___________________________ */
    /* Se asignan los valores para el array según sean
    las filas afectadas mayores o no a 0 */
    if ($conexion->eliminarProducto($id) > 0) {
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto eliminado con exito";
    } else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Producto no pudo ser eliminado";
    }
    $conexion->cerrar();
    /* ___________________________ */
    /* Envío del array */
    echo json_encode($respuesta);
?>