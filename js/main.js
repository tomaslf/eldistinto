
//ARRAY DE OBJETOS DE MIS PRODUCTOS

const productos = [
    {id:1, producto: "Pan Baguette", descripcion: "Pan Baguette realizado con masa madre", precio: 200, imagen:"baguette.png"}, 
    {id:2, producto: "Pan Lactal Blanco", descripcion: "Pan de molde 100% harina blanca y sémola.", precio: 350, imagen:"lactalblanco.png"}, 
    {id:3, producto: "Pan Lactal Integral", descripcion: "Pan de molde 50% harina integral 50% harina blanca y sémola.", precio: 400, imagen:"lactalintegral.png"},
    {id:4, producto: "Pan Masa Madre Blanco", descripcion: "Hogaza 90% harina blanca y 10% sémola. Realizada con masa madre de centeno", precio: 450, imagen:"masamadreblanco.png"},
    {id:5, producto: "Pan Masa Madre Integral", descripcion: "Hogaza 50% harina blanca y 50% Integral. Realizada con masa madre de centeno", precio: 500, imagen:"masamadreintegral.png"},
    {id:6, producto: "Medialunas de Manteca", descripcion: "Medialunas de manteca realizadas con triple fermentación 72hs.", precio: 100, imagen:"medialunas.png"},
    {id:7, producto: "Pan de Hamburguesa", descripcion: "Pan de hamburguesa elaborado con harinas organicas y manteca", precio: 100, imagen:"hamburgesa.png"},
    {id:8, producto: "Pan dulce", descripcion: "Verdadero Pan Dulce, con muchos frutos secos y naranjas confitadas", precio: 650, imagen:"pandulce.png"},
    {id:9, producto: "Focaccia Italiana", descripcion: "Focaccia elaborada con masa madre y fermentación 48 hs", precio: 850, imagen:"panfocaccia.png"},
    {id:10, producto: "Pan Ciabatta", descripcion: "Pan italiano clásico con un alto contenido líquido, reconocible por el gran panal de la miga.", precio: 250, imagen:"panciabatta.png"}
 ];

const productosElegidos = [];

class Productos {
    constructor (producto, precio,id){
        this.id = id;
        this.producto = producto;
        this.precio = parseFloat(precio);
        this.iva = 1.21;
        this.envio = 200;
    }

    sumarIva(){
        this.precio= this.precio * this.iva;
    }
}

const crearCardsDeProductos = () =>{
    let productos = recibirProductosLS ();
    productos.forEach((producto,indice) => {
        let div = document.createElement("div");
        div.className = "col";
        div .innerHTML = `<div class="card mt-4">                       
                        <img class="card-img-top"  src='images/${producto.imagen} 'width=150 height=300>
                        <h5 class="card-title text-start ms-1" id="producto"><strong>${producto.producto} </h5>
                        <p class="card-text text-start fw-lighter ms-1"> ${producto.descripcion} </p>
                        <p class="card-text text-center"><strong>$ ${producto.precio} por unidad</p>
                        <a class="btn btn-warning" onclick="agregarAlCarrito(${indice})">Agregar</a>
                        </div>`
        document.getElementById("cards").appendChild(div);
       
        });

}
let productosAgregados = document.getElementById("productosElegidos");
const generarCarrito = () =>{
    
productosAgregados = document.getElementById("productosElegidos");
productosAgregados.innerHTML = "";
    if (productosElegidos.length > 0){ 
        let total = 0;
        let totalProductos = 0;
        productosElegidos.forEach((producto, indice) => { 
          let subTotal = producto.precio * producto.cantidad;
          totalProductos += producto.cantidad;
            
            productosAgregados = document.createElement("div");
            productosAgregados.innerHTML = `
                                            <div>   
                                            <p class= "mt-3"> Producto: ${producto.producto} x ${producto.cantidad} -- SubTotal de $ ${producto.precio * producto.cantidad}
                                           
                                            <a class="btn btn-sm btn-danger mb-2" onclick="eliminarDelCarrito(${indice})"><img src='images/trash.png'width=15 height=15></a></p>
                                            </div>`;                                               
                document.getElementById("productosElegidos").appendChild(productosAgregados);
                total += subTotal;
                
                
                
                
                
                
         })

        const sumarCarrito = document.createElement("div");
        sumarCarrito.innerHTML = `${totalProductos}`;
        document.getElementById("carrito").appendChild(sumarCarrito);
        
         
         const totalCompra = document.createElement("div");
         totalCompra.innerHTML = `<div id="total" class="text-center"> TOTAL $${total * 1.21} IVA Incluído </div>
                                <button type="button" class="btn btn-danger ms-2 mb-3 mt-3 "  onclick=vaciarCarrito() > Vaciar Carrito
                                <button type="button" class="btn btn-secondary ms-2 mb-3 mt-3"  onclick=agregarEnvio() > Agregar Envío <img src='images/bicycle.svg'width=20 height=20>
                                <button type="button" onclick="finalizarCompra()" class="btn btn-success ms-2 mb-3 mt-3 d-flex justify-content-center">
                                Finalizar Compra
                                </button>
                                 
                                  `;
                document.getElementById("productosElegidos").appendChild(totalCompra);
        
            agregarEnvio = () =>{

                if (total > 3000){
                    let agregarEnvio = document.createElement("div");
                    agregarEnvio.innerHTML = `<div class="alert alert-success text-center">Tenes el envío bonificado</div>
                                                <div class="text-center"><strong>TOTAL con envío $${total * 1.21}</div> `
                    document.getElementById("total").appendChild(agregarEnvio);
                    envioGratis();
                    
                } else {
                    agregarEnvio = document.createElement("div");
                    agregarEnvio.innerHTML = `<div class="text-center">Envío $ 200</div>
                                                <div class="text-center"><strong>TOTAL con envío $${(total * 1.21) + 200}</div> `
                    document.getElementById("total").appendChild(agregarEnvio);
                    sumarEnvio();
                }
                
                
            } 
}
}

const sumarEnvio = () =>{
    Swal.fire({
        title: 'Agregaste el envío a tu pedido',
        imageUrl: 'images/bicienvio.png',
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: 'Custom image',
        showClass: {
        popup: 'animate__animated animate__fadeInRight',
        
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutLeft'
        }
      })
}
const finalizarCompra = () =>{
    
    Swal.fire({
         title:  'Gracias por tu compra.',
         text: ' Te llegará un mail a la brevedad con la factura de la misma.',
         icon: 'success'
    });
    vaciarCarrito();
}
const envioGratis = () =>{
    Swal.fire({
        title: 'Superaste los $ 3000',
        text: 'Tenes el envío bonificado.',
        imageUrl: 'images/canasta.png',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
}

const agregarAlCarrito= (indice) => {
    recibirProductosDelCarritoLS();   
    let indiceEncontrado = productosElegidos.findIndex((elemento)=>{
        return elemento.id === productos[indice].id;           
    })
    let agregarProducto = productos[indice];
    (indiceEncontrado === -1) ? (agregarProducto.cantidad = 1,  productosElegidos.push(agregarProducto),  guardarProductosDelCarritoLS(productosElegidos),generarCarrito()) : (productosElegidos[indiceEncontrado].cantidad += 1, guardarProductosDelCarritoLS(productosElegidos),generarCarrito());

    
}

const vaciarCarrito = (indice) =>{  
    productosElegidos.splice(indice);
    guardarProductosDelCarritoLS(productosElegidos);
    generarCarrito();  
} 

const eliminarDelCarrito = (indice) =>{  
    productosElegidos.splice(indice,1);
    guardarProductosDelCarritoLS(productosElegidos);
    generarCarrito();  
} 

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


guardarProductosLS(productos);
crearCardsDeProductos();



    
    


