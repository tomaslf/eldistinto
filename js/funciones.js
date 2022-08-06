// FUNCIONES DEL CARRITO
const agregarAlCarrito= (indice) => {
    toastAgregoProducto();
    recibirProductosDelCarritoLS();   
    let indiceEncontrado = productosElegidos.findIndex((elemento)=>{
        return elemento.id === productos[indice].id;                   
    })
    let agregarProducto = productos[indice];
    (indiceEncontrado === -1) ? (agregarProducto.cantidad = 1,  productosElegidos.push(agregarProducto),  guardarProductosDelCarritoLS(productosElegidos),generarCarrito()) : (productosElegidos[indiceEncontrado].cantidad += 1, guardarProductosDelCarritoLS(productosElegidos),generarCarrito());     
}

const sumarUno = (indice) =>{
    recibirProductosDelCarritoLS();      
    let indiceEncontrado = productosElegidos.findIndex((elemento)=>{
        return elemento.id === productosElegidos[indice].id;                   
    })    
    let agregarProducto = productos[indice];
    (indiceEncontrado === -1) ? (agregarProducto.cantidad = 1, productosElegidos.push(agregarProducto),  guardarProductosDelCarritoLS(productosElegidos),generarCarrito()) : (productosElegidos[indiceEncontrado].cantidad += 1, guardarProductosDelCarritoLS(productosElegidos),generarCarrito());
}
const restarUno = (indice) =>{
    recibirProductosDelCarritoLS();      
    let indiceEncontrado = productosElegidos.findIndex((elemento)=>{
        return elemento.id === productosElegidos[indice].id;                   
    })    
    let agregarProducto = productos[indice];
    (productosElegidos[indiceEncontrado].cantidad === 1) ? (eliminarDelCarrito(),  guardarProductosDelCarritoLS(productosElegidos),generarCarrito()) : (productosElegidos[indiceEncontrado].cantidad -= 1, guardarProductosDelCarritoLS(productosElegidos),generarCarrito());
}

const sumarAlCarrito = () =>{
    let productos = recibirProductosDelCarritoLS();
    let contenido = `0`;
    let totalProductos = 0;
    if (productos.length > 0){
        for (let producto of productos){
            totalProductos += producto.cantidad;
            
        }
       contenido = `${totalProductos}`;
    }
    document.getElementById("carrito").innerHTML = contenido;
}
const vaciarCarrito = (indice) =>{  
    productosElegidos.splice(indice);
    guardarProductosDelCarritoLS(productosElegidos);
    sumarAlCarrito();
    generarCarrito();  
} 

const eliminarDelCarrito = (indice) =>{  
    productosElegidos.splice(indice,1);
    guardarProductosDelCarritoLS(productosElegidos);
    sumarAlCarrito();
    generarCarrito();  
}

const toastAgregoProducto = () =>{
    Toastify({

        text: "Agregaste un producto",
        
        duration: 1000,
        offset: {
            x: 10, 
            y: 150
          },
          style: {
            background: "linear-gradient(to right, #DAE2B6, rgba(196, 141, 21, 0.900) )",
            color: "black",
          }
        
        }).showToast();
}

//ORDENAR PRODUCTOS
let ordenar = document.getElementById("ordenar");

ordenar.addEventListener("change", acomodar);

function acomodar () {
document.getElementById("cards").innerHTML = "";
   let acomodando = ordenar.value;
    if (acomodando === "ascendente"){
        crearCardsDeProductos(
            productos.sort((a, b) => {
                if (a.precio > b.precio) {
                    return -1;
                }
                if (a.precio < b.precio) {
                    return 1;
                }
                return 0;
            })
)} else if (ordenar.value == "descendente") {
    crearCardsDeProductos(
        productos.sort((a, b) => {
            if (a.precio < b.precio) {
                return -1;
            }
            if (a.precio > b.precio) {
                return 1;
            }
            return 0;
        })
    );

} else if (ordenar.value == "nombre") {
    crearCardsDeProductos(
        productos.sort((a, b) => {
            if (a.producto == b.producto) {
                return 0;
            }
            if (a.producto < b.producto) {
                return -1;
            }
            return 1;
        })
    );
} else if (ordenar.value == "todos") {
    crearCardsDeProductos(
        productos.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        })
    );
 }};


// FUNCIONES DE STORAGE
function recibirProductosLS() {
    return JSON.parse(localStorage.getItem("productos")) || productosElegidos;
}
const guardarProductosLS = (productos) =>{
    localStorage.setItem("productos", JSON.stringify(productos));
}
const recibirProductosDelCarritoLS= () =>{
    return JSON.parse(localStorage.getItem("productosElegidos"));
}
const guardarProductosDelCarritoLS = (productosElegidos) =>{
    localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos));
}
