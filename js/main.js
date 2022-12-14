
let productos = [];

fetch('js/productos.json')
.then((resultado) => resultado.json())
.then((data) =>{
        crearCardsDeProductos(data);
});

const productosElegidos = [];


const crearCardsDeProductos = (data) =>{
    productos = data;
    
    productos.forEach((producto,indice) => {
        let div = document.createElement("div");
        
        div.className = "col";
        div .innerHTML = `<div class="card mt-4">                       
                        <img class="card-img-top"  src='images/${producto.imagen} 'width=150 height=300>
                        <h5 class="card-title text-start ms-1" id="producto"><strong>${producto.producto} </h5>
                        <p class="card-text text-start fw-lighter ms-1"> ${producto.descripcion} </p>
                        <p class="card-text text-center"><strong>$ ${producto.precio} por unidad</p>
                        <a class="btn btn-warning"  onclick="agregarAlCarrito(${indice})">Agregar</a>
                        </div>`
        document.getElementById("cards").appendChild(div);
       
        });
        
}
    let productosAgregados = document.getElementById("productosElegidos");
       productosAgregados.innerHTML = `<img id="canasta"  class="mt-5" src='images/canastavacia.png'width=200 height=200>
                                        <div class="alert alert-danger text-center" role="alert">
                                        Tu carrito no tiene ningun producto
                                        </div>
                                        `;      
const generarCarrito = () =>{  

    productosAgregados = document.getElementById("productosElegidos");
    productosAgregados.innerHTML = "";
        if (productosElegidos.length > 0){ 
            let total = 0;
            productosElegidos.forEach((producto, indice) => { 
            let subTotal = producto.precio * producto.cantidad;                
                productosAgregados = document.createElement("div");
                productosAgregados.innerHTML = `
                                                <div class="divProductos">                                                
                                                <p class= "text-center mt-2"> <img class="me-3" src='images/${producto.imagen} 'width=70 height=70><strong>${producto.producto}
                                                <div class="text-center">
                                                <button type="button" class="btn-sm btn-secondary ms-1 me-1" onclick="restarUno(${indice})">-</button><strong> ${producto.cantidad}</strong><button type="button" class="btn-sm btn-secondary me-1 ms-2" onclick="sumarUno(${indice})">+</button>
                                                </div>  
                                                <div class="text-center"> SubTotal de $ ${producto.precio * producto.cantidad}
                                                <a class="btn btn-sm btn-danger mt-2 mb-2 " onclick="eliminarDelCarrito(${indice})"><img src='images/trash.png'width=15 height=15></a></p></div>
                                                
                                                </div>`;

                    document.getElementById("productosElegidos").appendChild(productosAgregados);
                    total += subTotal;
                    sumarAlCarrito();
                              
         })                  
         const totalCompra = document.createElement("div");
         totalCompra.innerHTML = `<div id="total" class="text-center mt-2"> TOTAL $${total * 1.21} IVA Inclu??do </div>
                                <div id="botones">
                                <button type="button" class="btn btn-danger ms-2 mb-3 mt-3 "  onclick="vaciarCarrito()" > Vaciar Carrito
                                <button type="button" class="btn btn-secondary ms-2 mb-3 mt-3"  onclick="agregarEnvio()" > Agregar Env??o <img src='images/bicycle.svg'width=20 height=20>
                                </div>
                                <div>
                                <button type="button" id="botonFinalizar" onclick="finalizarCompra()" class="btn btn-success mt-2">
                                Finalizar Compra
                                </button>
                                </div>
                                 
                                  `;
                document.getElementById("productosElegidos").appendChild(totalCompra);


            
            agregarEnvio = () =>{

                if (total > 3000){
                    let agregarEnvio = document.createElement("div");
                    agregarEnvio.innerHTML = `<div class="alert alert-success text-center mt-2 mb-2">Tenes el env??o bonificado</div>
                                                <div class="text-center mt-2 mb-2"><strong>TOTAL con env??o $${total * 1.21}</div> `
                    document.getElementById("total").appendChild(agregarEnvio);
                    envioGratis();
                    
                } else {
                    agregarEnvio = document.createElement("div");
                    agregarEnvio.innerHTML = `<div class="text-center">Env??o $ 200</div>
                                                <div class="text-center"><strong>TOTAL con env??o $${(total * 1.21) + 200}</div> `
                    document.getElementById("total").appendChild(agregarEnvio);
                    sumarEnvio();
                }
                
                
            } 
            }else{
        productosAgregados = document.getElementById("productosElegidos");
        productosAgregados.innerHTML = `<img id="canasta"  class="mt-5" src='images/canastavacia.png'width=200 height=200>
                                        <div class="alert alert-danger text-center" role="alert">
                                        Tu carrito no tiene ningun producto
                                        </div>`;
                document.getElementById("productosElegidos").appendChild(productosAgregados);
}
}
// ALERTAS
const sumarEnvio = () =>{
    Swal.fire({
        text: 'Agregaste a tu pedido el env??o. Su costo es $200.',
        imageUrl: 'images/bicienvio.png',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showClass: {
        popup: 'animate__animated animate__fadeInRight',        
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutLeft'
        }
      })
}
async function finalizarCompra () {     
    const {} = await Swal.fire({
        title: 'Ingresa tu email',
        input: 'email',
        inputLabel: 'Aqui enviaremos la factura de tu compra',
        inputPlaceholder: 'Ingresa tu email'
      })  
    gracias();  
    vaciarCarrito();
    
}
const gracias = () =>{
    Swal.fire({
        title:  'Gracias por tu compra.',
        text: 'Te llegar?? un mail a la brevedad con la factura de la misma.',
        icon: 'success',
        
   }).then(function() {
    window.location = "index.html";
})
}
const envioGratis = () =>{
    Swal.fire({
        title: 'Superaste los $ 3000',
        text: 'Tenes el env??o bonificado.',
        imageUrl: 'images/canasta.png',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
}













    
    


