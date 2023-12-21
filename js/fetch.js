fetch("../js/productos.json")
.then(respuesta => respuesta.json())
.then(productos => {
    let contenido = ""
        productos.forEach(producto => {
            contenido += `<div class= "col-md-3 mb-4">
            <div class="card text-center h-100">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                        <p class="card-text text-danger">$${producto.precio}</p>
                        <p>${producto.nombre}</p>
                        <p><button class="btn btn-primary" onclick="verProducto(${producto.id});">Ver Producto</button></p>
                        <p><button class="btn btn-success" onclick="agregarProducto(${producto.id});">Añadir al Carrito</button></p>
                        </div>
                        </div>
                        </div>`;
                        
                    });
                    
            
    document.getElementById("contenido").innerHTML = contenido;

})