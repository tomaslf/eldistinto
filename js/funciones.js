// FUNCIONES DEL CARRITO
const agregarAlCarrito= (indice) => {
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
    (indiceEncontrado === -1) ? (agregarProducto.cantidad -=1, productosElegidos.push(agregarProducto),  guardarProductosDelCarritoLS(productosElegidos),generarCarrito()) : (productosElegidos[indiceEncontrado].cantidad -= 1, guardarProductosDelCarritoLS(productosElegidos),generarCarrito());
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

// FUNCIONES DE STORAGE
const recibirProductosLS= () =>{
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
