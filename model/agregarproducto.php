<?php 
    // ----- ----- Agregar productos ----- -----
    require_once "Conexion.php";
    require_once "Producto.php";
    $conexion = new Conexion();
    $conexion->abrir();
    $producto = new Producto();
    $producto->nombre = $_GET['nombre'];
    $producto->cantidad = $_GET['cantidad'];
    $respuesta = array();
    
    /* ___________________________ */
    /* Se asignan los valores para el array según sean
    las posible la inserción, también se envía el 
    producto para ser insertado.*/
    if ($conexion->insertarProducto($producto) > 0) {
        $respuesta["accion"] = 1;
        $respuesta["mensaje"] = "Producto insertado con exito";
    } else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "Producto no pudo ser insertado";
    }
    
    $conexion->cerrar();

    /* ___________________________ */
    /* Envío del array */
    echo json_encode($respuesta);

    /* ______________________________________________________ */
    /* para revisar si está funcionando
    http://localhost/gestionProductoPDO/model/agregarproducto.php?nombre=azucar&cantidad=5 */
?>