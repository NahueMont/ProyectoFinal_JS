function guardarProductosLS() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosLS() {
    return JSON.parse(localStorage.getItem("productos"));
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function buscarProducto(id) {
    const productos = cargarProductosLS();
    return productos.find(item => item.id === id);
}
function verProducto(id){
    let productos = cargarProductosLS(); 
    let producto = productos.find(item => item.id === id);
    localStorage.setItem("producto", JSON.stringify(producto));
    location.href = "../pages/ver-producto.html"; //Redireccionar a la página pasada por parámetro
}
function estaEnElCarrito(id){
    const carrito = cargarCarritoLS();
    return carrito.some(item => item.id === id);
}

function agregarProducto(id) {
    const carrito = cargarCarritoLS();
    if (estaEnElCarrito(id)===true) {
        let pos = carrito.findIndex(item => item.id === id);
        carrito[pos].cantidad += 1;
    }else{
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }    
    guardarCarritoLS(carrito);
    renderBotonCarrito();
}

function eliminarProducto(id) {
    const carrito = cargarCarritoLS();
    let pos = carrito.findIndex(item => item.id === id);
    if(carrito[pos].cantidad > 1){ 
    carrito[pos].cantidad -= 1;
    }else{
    carrito.splice(pos,1)
    }
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    renderProductos();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderBotonCarrito();
    renderProductos();
}

function cantidadTotalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0);

}

function sumaTotalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador += item.precio * item.cantidad, 0);
}

function renderBotonCarrito() {
    let botonCarrito = document.getElementById("botonCarrito");
    let contenido = `<button type="button" class="btn position-relative">
    <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-shopping-cart-shopping-cart.png" alt="Carrito" height="50" width="50px">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalProductos()}
    </span>
    </button>`;
    botonCarrito.innerHTML = contenido;
}

function filtrarProductos (){
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
 }
function filtrarProductosConCheck (){
    let productos = cargarProductosLS();
    let check1 = document.getElementById("checkSwift");
    let check2 = document.getElementById("checkPaty");
    let check3 = document.getElementById("checkGoodMark");
    let check4 = document.getElementById("checkCarrefour");
    let check5 = document.getElementById("checkUnionGranadera");
    let check6 = document.getElementById("checkCasera");
    let check7 = document.getElementById("checkIndustrial");

    let contenido = "";
    
    productos = productos.filter(item => (check1.checked && item.marca === check1.value) || (check2.checked && item.marca === check2.value) || (check3.checked && item.marca === check3.value) || (check4.checked && item.marca === check4.value) || (check5.checked && item.marca === check5.value)) ;
    
    if(check6.checked || check7.checked){
        productos = productos.filter(item => (check6.checked && item.tipo === check6.value) || (check7.checked && item.tipo === check7.value)) ;
    }
    
   

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
                    document.getElementById("contenido").innerHTML = contenido;
                    
    }else{
        renderProductos();
    }     
}