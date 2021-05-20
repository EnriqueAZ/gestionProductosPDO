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
    ajax.open("GET", "view/" + plantilla);
    ajax.onreadystatechange = respuestaCargar;
    ajax.send(null);
    /* ajax.send(); = ajax.send(null);*/
}

function respuestaCargar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        document.getElementById("contenido").innerHTML = ajax.responseText;
    }
}

// ________________________________________________________

// Petición al servidor para cargar la plantilla mostrar
function cargarMostrar() {
    ajax.open("GET", "view/mostrar.html", true);
    ajax.onreadystatechange = respuestaMostrar;
    ajax.send(null);
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
    ajax.open("GET", "model/agregarproducto.php?" + obtenerQueryProducto(), true);
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
    var nombre = document.getElementById("nombre").value;
    var cantidad = document.getElementById("cantidad").value;    
    var queryString = "nombre=" + encodeURIComponent(nombre) + "&cantidad=" + encodeURIComponent(cantidad) + "&nocache=" + Math.random();
    return queryString;
}

// ________________________________________________________

/* Función para solicitar los productos al 
servidor y mostrar los datos */
function cargarTabla() {
    ajax.open("GET", "model/consultarproductos.php");
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

// Petición al servidor para cargar la plantilla actulizar
function cargarMostrarActualizar() {
    ajax.open("GET", "view/actualizar.html", true);
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
    ajax.open("GET", "model/consultarproductos.php", true);
    ajax.onreadystatechange = respuestaTablaActualizar;
    ajax.send();       
}

function respuestaTablaActualizar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        if (respuesta.accion == 0) {
            alert(respuesta.mensaje);
        }else{
            cargarDatosAcBo(respuesta.productos);
        }
    }
}

// ________________________________________________________

// Función para cargar los datos de los productos Actualizar
function cargarDatosAcBo(productos) {
    select = document.getElementById("nombre");

    input = document.getElementById("cantidad");
    for (var i = 0; i < productos.length; i++) {
        var option = document.createElement("option");
        select.appendChild(option);
        option.value = productos[i].id;
        option.valor = i;
        var nombre = document.createTextNode(productos[i].nombre);
        option.appendChild(nombre);
    }
    /* ______________________________________________________*/
    /* addEvenListener para obtener el index de los elmentos
    y asinar el valor en el input que corresponde en la bd */
    
    select.addEventListener('change',
    function(){
        var selectedOption = this.options[select.selectedIndex];
        /* ______________________________________________________ */
        /* Ese dato .valor es tipo de dato en realidad data-*
        En este caso data-valor que almacena valores*/
        input.value = productos[selectedOption.valor].cantidad; 
        /* var suma = parseInt(selectedOption.value)  + 1;
        console.log(suma); */
        /* console.log(productos[selectedOption.valor].cantidad); */
    });
    
    
}

// ________________________________________________________

// Envio de la información al servidor y la bd
function enviarProductoActualizar() {
    ajax.open("GET", "model/actualizarproducto.php?" + obtenerQueryProductoActualizado(), true);
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


// ________________________________________________________

// Petición al servidor para cargar la plantilla borrar
function cargarMostrarBorrar() {
    ajax.open("GET", "view/borrar.html", true);
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
    ajax.open("GET", "model/consultarproductos.php", true);
    ajax.onreadystatechange = respuestaTablaActualizar;
    ajax.send();       
}

function respuestaTablaActualizar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        if (respuesta.accion == 0) {
            alert(respuesta.mensaje);
        }else{
            cargarDatosAcBo(respuesta.productos);
        }
    }
}

// ________________________________________________________

// Envio de la información al servidor y la bd
function enviarProductoBorrar() {
    ajax.open("GET", "model/eliminarproducto.php?" + obtenerQueryProductoBorrar(), true);
    ajax.onreadystatechange = respuestaBorrar;
    ajax.send();    
}

function respuestaBorrar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        alert(respuesta.mensaje)
    }
}

function obtenerQueryProductoBorrar() {
    var id = document.getElementById("nombre").value;
    var queryString = "id=" + encodeURIComponent(id) + "&nocache=" + Math.random();
    return queryString;
}

// ________________________________________________________

// Envio de la información al servidor y la bd
function enviarProductoBuscar() {
    ajax.open("GET", "model/buscarproducto.php?" + obtenerQueryProductoBuscar(), true);
    ajax.onreadystatechange = respuestaBuscar;
    ajax.send();    
}

function respuestaBuscar() {
    if (ajax.readyState == 4 && ajax.status == 200) {
        var respuesta = JSON.parse(ajax.responseText);
        if (respuesta.accion == 0) {
            alert(respuesta.mensaje);
        }else{
            cargarProducto(respuesta.productos)
        }
        alert(respuesta.mensaje)
    }
}

function obtenerQueryProductoBuscar() {
    var nombre = document.getElementById("nombre").value;
    
    var queryString = "nombre=" + encodeURIComponent(nombre) + "&nocache=" + Math.random();
    
    return queryString;

}

// ________________________________________________________

// Función para cargar los datos del producto
function cargarProducto(productos) {
    tabla = document.getElementById("tabla");
    var fila = document.createElement("tr");
    tabla.appendChild(fila);
    var celda1 = document.createElement("td");
    fila.appendChild(celda1);
    var id = document.createTextNode(productos[0].id);
    celda1.appendChild(id);
    var celda2 = document.createElement("td");
    fila.appendChild(celda2);
    var nombre = document.createTextNode(productos[0].nombre);
    celda2.appendChild(nombre);
    var celda3 = document.createElement("td");
    fila.appendChild(celda3);
    var cantidad = document.createTextNode(productos[0].cantidad);
    celda3.appendChild(cantidad);
    
}