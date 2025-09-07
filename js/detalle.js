import { actualizarContadorCarrito } from "./catalogo.js";

// --- Función auxiliar para mostrar estrellas ---
function crearEstrellas(valor = 5) {
    const max = 5;
    let html = "";
    for (let i = 1; i <= max; i++) {
        html += `<span class="estrella">${i <= valor ? "★" : "☆"}</span>`;
    }
    return html;
}

// --- Función para ir al detalle desde el catálogo ---
export function detalleProducto(p) {
    // Guardar el producto en localStorage
    localStorage.setItem("productoDetalle", JSON.stringify(p));
    // Redirigir a la página de detalle
    window.location.href = "producto.html";
}

// --- Función para agregar al carrito ---
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();
    mostrarMensajeCarrito("Producto agregado al carrito ✅", "exito");
}

// --- Mensajes flotantes para el carrito ---
function mostrarMensajeCarrito(texto, tipo = "exito") {
    const mensajePrevio = document.querySelector(".carrito-message");
    if (mensajePrevio) mensajePrevio.remove();

    const divMensaje = document.createElement("div");
    divMensaje.textContent = texto;
    divMensaje.classList.add("carrito-message");
    divMensaje.style.padding = "10px";
    divMensaje.style.marginTop = "15px";
    divMensaje.style.textAlign = "center";
    divMensaje.style.borderRadius = "5px";
    divMensaje.style.position = "fixed";
    divMensaje.style.top = "24px";
    divMensaje.style.left = "50%";
    divMensaje.style.transform = "translateX(-50%)";
    divMensaje.style.zIndex = "9999";
    divMensaje.style.minWidth = "220px";

    if (tipo === "error") {
        divMensaje.style.backgroundColor = "#f8d7da";
        divMensaje.style.color = "#721c24";
    } else {
        divMensaje.style.backgroundColor = "#d4edda";
        divMensaje.style.color = "#155724";
    }

    document.body.appendChild(divMensaje);

    if (tipo === "exito") {
        setTimeout(() => {
            divMensaje.remove();
        }, 3500);
    }
}

// --- Renderizar el detalle al cargar ---
document.addEventListener("DOMContentLoaded", () => {
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    const contenedor = document.querySelector("#detalle");

    if (!contenedor) return; // seguridad, por si se carga en otra página

    if (producto) {
        contenedor.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-imagen">
            <div class="valoracion-estrellas">${crearEstrellas(producto.valoracion || 5)}</div>
            <p class="descripcion">${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Stock:</strong> ${producto.stock ?? "No disponible"}</p>
            ${producto.material ? `<p><strong>Material:</strong> ${producto.material}</p>` : ""}
            ${producto.medidas ? `<p><strong>Medidas:</strong> ${producto.medidas}</p>` : ""}
            <button id="volver">⬅ Volver</button>
            <button id="agregar-carrito">🛒 Agregar al carrito</button>
        `;

        // Botón volver
        document.querySelector("#volver").addEventListener("click", () => {
            window.history.back();
        });

        // Botón agregar al carrito
        document.querySelector("#agregar-carrito").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    } else {
        contenedor.textContent = "❌ Producto no encontrado.";
    }
});