export function agregarAlCarrito(p) {
    console.log(p)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    const objeto_producto = {
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        cantidad: 1
    }

    const index = carrito.findIndex(item => item.id === objeto_producto.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push(objeto_producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${p.nombre} ha sido agregado al carrito.`);
    //actualizar contador
}

export function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-productos");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        actualizarResumen(0, 0);
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * (producto.cantidad ?? 1);

        const item = document.createElement("div");
        item.className = "carrito-item";
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
            <div class="carrito-info">
                <h3>${producto.nombre}</h3>
                <p><strong>Materiales:</strong> ${producto.material ?? "-"}</p>
                <p><strong>Dimensiones:</strong> ${producto.medidas ?? "-"}</p>
                <p><strong>Tiempo:</strong> ${producto.tiempo ?? "-"}</p>
                <div class="carrito-cantidad">
                    <label for="cantidad-${producto.id}">Cantidad:</label>
                    <input type="number" id="cantidad-${producto.id}" min="1" value="${producto.cantidad ?? 1}">
                </div>
            </div>
            <div class="carrito-precio">
                <p>$${producto.precio}</p>
                <button class="eliminar-btn" data-id="${producto.id}">❌</button>
            </div>
        `;
        contenedor.appendChild(item);

        // Actualizar cantidad en el carrito
        item.querySelector(`#cantidad-${producto.id}`).addEventListener("change", e => {
            const nuevaCantidad = parseInt(e.target.value) || 1;
            producto.cantidad = nuevaCantidad;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderizarCarrito();
        });
    });

    // Eliminar producto
    contenedor.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        const id = btn.dataset.id;
        const index = carrito.findIndex(p => p.id == id);
        if (index !== -1) {
            carrito[index].cantidad -= 1; 
            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
    });
 });
    

    actualizarResumen(carrito.length, carrito.reduce((acc, p) => acc + p.precio * (p.cantidad ?? 1), 0));
}

export function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderizarCarrito();
}

function actualizarResumen(cantidad, total) {
    const resumen = document.querySelector(".resumen");
    if (!resumen) return;
    resumen.innerHTML = `
        <h2>Resumen del pedido</h2>
        <p>Subtotal: ${cantidad} producto${cantidad !== 1 ? "s" : ""}</p>
        <p>Envío: <span style="color: #87A96B;">Gratis</span></p>
        <h3>Total: $${total.toLocaleString()}</h3>
        <button class="finalizar-btn">Finalizar Compra</button>
        <p>Compra 100% segura y protegida</p>
    `;
}