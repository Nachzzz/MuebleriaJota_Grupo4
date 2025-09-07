function crearEstrellas(valor = 5) {
    const max = 5;
    let html = "";
    for (let i = 1; i <= max; i++) {
        html += `<span class="estrella">${i <= valor ? "★" : "☆"}</span>`;
    }
    return html;
}

export function detalleProducto(p) {
    // Guardar el producto en localStorage
    localStorage.setItem("productoDetalle", JSON.stringify(p));
    // Redirigir a la página de detalle
    window.location.href = "producto.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    const contenedor = document.querySelector("#detalle");

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
            <button id="volver">Volver</button>
        `;

        document.querySelector("#volver").addEventListener("click", () => {
            window.history.back();
        });
    } else {
        contenedor.textContent = "❌ Producto no encontrado.";
    }
});