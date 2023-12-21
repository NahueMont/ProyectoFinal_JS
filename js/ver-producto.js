function renderProducto(){
    const producto = JSON.parse(localStorage.getItem("producto"));
    let contenido = 
    `<div class= "col-md-4 offset-md-3">
        <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
        </div>
        <div class= "col-md-4">
            <p class="text-body-tertiary">${producto.marca}</p>
            <h3 class="text-secondary">${producto.nombre}</h3>
            <h4 class= "text-primary">$${producto.precio}</h4>
            <button class= "btn btn-danger my-5" onclick="agregarProducto(${producto.id});">Agregar al Carrito(+)</button>
        </div>
    </div>`;
    document.getElementById("contenido").innerHTML = contenido;


}
renderProducto();
renderBotonCarrito();
