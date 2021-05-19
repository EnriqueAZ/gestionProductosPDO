// ________________________________________________________

// ajax, para poder interactuar con el servidor.
function obtenerAjax() {    
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
}
var ajax = obtenerAjax();

// ________________________________________________________

/* Para cargar la plantilla inicio cuando se inicia 
el sitio y cuando el usuario da clic sobre el menú inicio */
window.onload = function() {
    cargarPlantilla('inicio.html');
}

function cargarPlantilla(plantilla) {
    ajax.open("GET", plantilla, true);
    ajax.onreadystatechange = respuestaCargar;
    ajax.send();
}

function respuestaCargar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        document.getElementById("contenido").innerHTML = ajax.responseText;
    }
}

// ________________________________________________________

// Petición al servidor para cargar la plantilla mostrar
function cargarMostrar() {
    ajax.open("GET", "mostrar.html", true);
    ajax.onreadystatechange = respuestaMostrar;
    ajax.send();
}

function respuestaMostrar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        document.getElementById("contenido").innerHTML = ajax.responseText;
        cargarTabla();
    }
}

// ________________________________________________________

// Envio de la información al servidor y la bd
function enviarProducto() {
    ajax.open("GET", "agregarproducto.php?" + obtenerQueryProducto(), true);
    ajax.onreadystatechange = respuestaAgregar;
    ajax.send();    
}

function respuestaAgregar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        alert(respuesta.mensaje)
    }
}

function obtenerQueryProducto() {
    var id = document.getElementById("id").value;
    var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var queryString = "id=" + encodeURIComponent(id) + "&nombre=" + encodeURIComponent(nombre) + "&cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
    return queryString;
}

// ________________________________________________________

/* Función para solicitar los productos al 
servidor y mostrar los datos */
function cargarTabla() {
    ajax.open("GET", "consultarproductos.php", true);
    ajax.onreadystatechange = respuestaTabla;
    ajax.send();       
}

function respuestaTabla() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        if (respuesta.accion == 0) {
            alert(respuesta.mensaje);
        }else{
            cargarDatos(respuesta.productos);
        }
    }
}

// ________________________________________________________

// Función para cargar los datos de los productos
function cargarDatos(productos) {
    tabla = document.getElementById("tabla");
    for (var i = 0; i < productos.length; i++) {
        var fila = document.createElement("tr");
        tabla.appendChild(fila);
        var celda1 = document.createElement("td");
        fila.appendChild(celda1);
        var id = document.createTextNode(productos[i].id);
        celda1.appendChild(id);
        var celda2 = document.createElement("td");
        fila.appendChild(celda2);
        var nombre = document.createTextNode(productos[i].nombre);
        celda2.appendChild(nombre);
        var celda3 = document.createElement("td");
        fila.appendChild(celda3);
        var cantidad = document.createTextNode(productos[i].cantidad);
        celda3.appendChild(cantidad);
    }
}

// ________________________________________________________

// Petición al servidor para cargar la plantilla mostrar actulizar
function cargarMostrarActualizar() {
    ajax.open("GET", "actualizar.html", true);
    ajax.onreadystatechange = respuestaMostrarActualizar;
    ajax.send();
}

function respuestaMostrarActualizar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        document.getElementById("contenido").innerHTML = ajax.responseText;
        cargarTablaActualizar();
    }
}

// ________________________________________________________

/* Función para solicitar los productos al 
servidor y mostrar los datos */
function cargarTablaActualizar() {
    ajax.open("GET", "consultarproductos.php", true);
    ajax.onreadystatechange = respuestaTablaActualizar;
    ajax.send();       
}

function respuestaTablaActualizar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        if (respuesta.accion == 0) {
            alert(respuesta.mensaje);
        }else{
            cargarDatosActualizar(respuesta.productos);
        }
    }
}

// ________________________________________________________

// Función para cargar los datos de los productos
function cargarDatosActualizar(productos) {
    select = document.getElementById("nombre");

    input = document.getElementById("cantidad");
    for (var i = 0; i < productos.length; i++) {
        var option = document.createElement("option");
        select.appendChild(option);
        option.value = i;
        var nombre = document.createTextNode(productos[i].nombre);
        option.appendChild(nombre);   
    }
    /* ______________________________________________________*/
    /* addEvenListener para obtener el index de los elmentos
    y asinar el valor en el input que corresponde en la bd */
    
    select.addEventListener('change',
    function(){
        var selectedOption = this.options[select.selectedIndex];
        input.value = productos[selectedOption.value].cantidad; 
        /* var suma = parseInt(selectedOption.value)  + 1;
        console.log(suma); */
    });
    
    
}

// ________________________________________________________

// Envio de la información al servidor y la bd
function enviarProductoActualizar() {
    ajax.open("GET", "actualizarproducto.php?" + obtenerQueryProductoActualizado(), true);
    ajax.onreadystatechange = respuestaAgregar;
    ajax.send();    
}

function respuestaAgregar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        alert(respuesta.mensaje)
    }
}

function obtenerQueryProductoActualizado() {
    var id = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;
    var queryString = "id=" + encodeURIComponent(id) + "&cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
    return queryString;
}