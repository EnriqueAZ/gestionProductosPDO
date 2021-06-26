<?php
    // -----:::::----- Conexión con la base de datos -----:::::-----
    class Conexion{
        private $conexion;

        public function abrir(){
            try {
                $this->conexion = new PDO("mysql:host=localhost;dbname=inventario","root","");
                $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return 1;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        }

        public function cerrar(){
            $this->conexion = null;
        }

        /* ______________________________________________________ */
        /* Insertar producto */
        public function insertarProducto(Producto $producto){
            $consulta = $this->conexion->prepare("INSERT INTO productos VALUES(null, ?, ?)");
            $consulta->bindParam(1, $producto->nombre);
            $consulta->bindParam(2, $producto->cantidad);
            $consulta->execute();
            return $consulta->rowCount();
        }

        /* ______________________________________________________ */
        /* Obtener productos */
        public function obtenerProductos(){
            $consulta = $this->conexion->prepare("SELECT * FROM productos");
            /* ______________________________________________________ */
            /* FETCH_ASSOC envía una matriz asociativa para obtener los 
            productos */
            $consulta->setFetchMode(PDO::FETCH_ASSOC);
            $consulta->execute();
            return $consulta->fetchAll();
        }

        /* ______________________________________________________ */
        /* Obtener producto por el nombre */
        public function obtenerProductoNombre($nombre){
            $consulta = $this->conexion->prepare("SELECT * FROM productos WHERE nombre LIKE '%".$nombre."%' ");
            // Ya que es una sola variable no hay necesiadad de utilizar bindParam eso y que no entra como clase
            // $consulta = $this->conexion->prepare("SELECT * FROM productos WHERE nombre LIKE '","%?%","' ");
            // $consulta->bindParam(1, $nombre);
            $consulta->setFetchMode(PDO::FETCH_ASSOC);
            $consulta->execute();
            return $consulta->fetchAll();
        }


        // public function obtenerEquipoId($id){
        //     $consulta = $this->conexion->prepare("SELECT * FROM equipos WHERE  id = ?");
        //     $consulta->bindParam(1, $id);
        //     $consulta->setFetchMode(PDO::FETCH_OBJ);
        //     $consulta->execute();
        //     return $consulta->fetchAll();
        // }

        public function actualizarEquipo(Producto $producto){
            $consulta = $this->conexion->prepare("UPDATE productos SET cantidad=? WHERE id=?");
            $consulta->bindParam(1, $producto->cantidad);
            $consulta->bindParam(2, $producto->id);
            $consulta->execute();
            return $consulta->rowCount();

        }

        public function eliminarProducto($id){
            $consulta = $this->conexion->prepare("DELETE FROM productos WHERE id=?");
            $consulta->bindParam(1, $id);
            $consulta->execute();
            return $consulta->rowCount();
        }
    }
?>