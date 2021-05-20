<?php 
    // ----- ----- Buscar un producto ----- -----
    require_once "Conexion.php";
    $conexion = new Conexion;
    $conexion->abrir();
    $nombre = $_GET["nombre"];
    $sql = "SELECT * FROM productos WHERE nombre='$nombre'";
    $conexion->consulta($sql);
    /* ___________________________ */
    /* La función obtenerResult devuelve las propiedades
    de la consulta, por ejemplo el número de filas o
    el el array con todos los elementos*/
    $result = $conexion->obtenerResult();
    $conexion->cerrar();
    /* ___________________________ */
    /* utf8_encode codifica la cadena de ISO-8859-1 a un
    string UTF-8 de esta manera queda guardada como string*/
    if ($result->num_rows > 0) {
        $respuesta["productos"] = array();
        $fila = $result->fetch_object();
        $producto = array();
        $producto["id"] = utf8_encode($fila->id);
        $producto["nombre"] = utf8_encode($fila->nombre);
        $producto["cantidad"] = utf8_encode($fila->cantidad);
        /* ___________________________ */
        /* Después de asignar un array a otro se obtienen
        y codifican en utf8 para asignar los valores a
        los campos de otro array el cual se asignará a 
        otro para ser enviado. Array anidado 
        [respuesta[productos->$producto]
                    [producto->$producto]
                    [accion]]*/
        array_push($respuesta["productos"], $producto);

        $respuesta["accion"] = 1;
    }else {
        $respuesta["accion"] = 0;
        $respuesta["mensaje"] = "No se encontraron productos";
    }
    echo json_encode($respuesta);
?>



