const carrito = [];
const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

if (carritoGuardado) {
    carrito.push(...carritoGuardado);
}

function mostrarCarrito(){
    const listaCarrito = document.querySelector("#lista-carrito");
    const totalCarrito = document.querySelector("#total");

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {



        const precioNumero = Number(
            producto.precio
            .replace("$", "")
            .replace(".", "")

        );

        const subtotal = precioNumero * producto.cantidad;
         listaCarrito.innerHTML += `

         <div class="item-carrito">

        <div class="info-producto">
            <h4>${producto.nombre}</h4>
            <p>Cantidad: ${producto.cantidad}</p>
        </div>

        <div class="acciones-producto">
            <span>$${subtotal.toLocaleString("es-AR")}</span>

            <button class="eliminar" data-nombre="${producto.nombre}">
                Eliminar
            </button>
        </div>

    </div>

        
         `;

        total += subtotal;
    

});

totalCarrito.textContent = `Total: $${total.toLocaleString("es-AR")}`;

 const botonesEliminar = document.querySelectorAll(".eliminar");

        botonesEliminar.forEach(boton => {

            boton.addEventListener("click", () =>{

                const nombre = boton.dataset.nombre;

                    const indice = carrito.findIndex(item => item.nombre === nombre);

                 carrito.splice(indice, 1);

                  mostrarCarrito();
                  localStorage.setItem("carrito", JSON.stringify(carrito));

  });

});

}




const botones = document.querySelectorAll(".agregar-carrito");


botones.forEach(boton=> {

    boton.addEventListener("click",() => {


        const producto = boton.closest(".producto");

        const nombre = producto.querySelector("h3").textContent;
        const precio = producto.querySelector("p").textContent;

        const productoCarrito = {
            nombre,
            precio,
            cantidad: 1
           };

           const productoExistente = carrito.find(item => item.nombre === nombre);
           if(productoExistente){
            productoExistente.cantidad++;
           } else {
            carrito.push(productoCarrito);
           }
           mostrarCarrito();
          localStorage.setItem("carrito", JSON.stringify(carrito));

           
        console.log(carrito);
    });
});

mostrarCarrito();

const botonFinalizar = document.querySelector("#finalizar-compra");

botonFinalizar.addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = `Hola GM.

Quiero realizar el siguiente pedido:

`;

    carrito.forEach(producto => {

        const precioNumero = Number(
            producto.precio
            .replace("$", "")
                .replace(".", "")
        );

        const subtotal = precioNumero * producto.cantidad;

        mensaje += `• ${producto.nombre} x${producto.cantidad} - $${subtotal.toLocaleString("es-AR")}
`;

    });

    const total = carrito.reduce((suma, producto) => {

        const precio = Number(
            producto.precio
                .replace("$", "")
                .replace(".", "")
        );

        return suma + precio * producto.cantidad;

    }, 0);

    mensaje += `
Total: $${total.toLocaleString("es-AR")}

Muchas gracias.`;

    const url = `https://wa.me/543813472851?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

});