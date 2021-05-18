<?php 
    // ----- ----- Conexion con el servidor ----- -----
    class Conexion{
        private $mySQLI;
        private $result;
        private $filasAfectadas;
        private $autoid;
        public function abrir(){
            $this->mySQLI = new mysqli("localhost","root","","inventario");
            if (mysqli_connect_error()) {
                return 0;
            } else {
                return 1;
            }
        }
        public function cerrar(){
            $this->mySQLI->close();
        }
        /* ___________________________ */
        /* inyección del código sql y asigna las 
        acciones a variables específicas */
        public function consulta($sql){
            $this->result = $this->mySQLI->query($sql); 
            $this->filasAfectadas = $this->mySQLI->affected_rows; 
            $this->autoid = $this->mySQLI->insert_id; 
        }
        /* ___________________________ */
        /* Retorno de los resultados */
        public function obtenerResult(){
            return $this->result;
        }
        public function obtenerFilasAfectadas(){
            return $this->filasAfectadas;
        }
        public function obtenerAutoId(){
            return $this->autoid;
        }
    }
?>