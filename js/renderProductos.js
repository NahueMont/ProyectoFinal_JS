function renderProductos(){
    let productos = cargarProductosLS();
    let textoBusqueda = document.getElementById("textoBusqueda").value;
    let contenido = "";

    productos = textoBusqueda ? productos.filter(item => item.nombre.toUpperCase().includes(textoBusqueda.toUpperCase())) : productos;

    if(productos.length > 0 ){

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
                    
    }else{
        contenido += `<div class="alert alert-danger text-center" role="alert">No se encontraron productos por el termino de busqueda</div>`; 
    }
            
    document.getElementById("contenido").innerHTML = contenido;
};

const pedirProductos = () => {
    document.getElementById("contenido").innerHTML = `<div class="d-flex align-items-center text-danger">
    <h2>Cargando productos...</h2>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>`;
    
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(productos);
        }, 1000);
    })
}
pedirProductos().then(resultado => {
    renderProductos(resultado);
});

renderBotonCarrito();