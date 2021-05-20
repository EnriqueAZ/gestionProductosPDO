<?php 
    // -----:::::----- Actualizar producto -----:::::-----
    require_once "Conexion.php";
    require_once "Producto.php";

    $conexion = new Conexion();
    $producto = new Producto();
    /* ___________________________ */
    /* El siguiente código llama la función abrir 
    de la conexión, con == 0 devolverá un boolean.
    Creo funcionará más en una condición*/
    $conexion->abrir() == 0;
    $producto->id = $_GET["id"];
    /* $id = (int) $valor; */
    $producto->cantidad = $_GET["cantidad"];
    
    $respuesta = array();
    /* ___________________________ */
    /* Se asignan los valores para el array según sean
    las filas afectadas mayores o no a 0 */
    if ($conexion->actualizarEquipo($producto) > 0) {
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto actualizado con exito";
    } else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Producto no pudo ser actualizado";
    }
    $conexion->cerrar();
    /* ___________________________ */
    /* Envío del array */
    echo json_encode($respuesta);
?>