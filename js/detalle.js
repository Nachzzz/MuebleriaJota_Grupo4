export function detalleProducto(p) {
    console.log("Detalle del producto:", p);

    // Guardar el producto en localStorage
    localStorage.setItem ("productoDetalle", JSON.stringify(p));

    // Redirigir a la página de detalle
    window.location.href = "producto.html";
}


document.addEventListener("DOMContentLoaded", () => {
    const producto = JSON.parse(localStorage.getItem("productoDetalle"));
    const contenedor = document.querySelector("#detalle");

    if (producto) {
        const div = document.createElement("div")
        contenedor.innerHTML = `
            
            <h2>${producto.nombre}</h2>
            <img src="${producto.img}" alt="${producto.nombre}" style="max-width:250px; display:block; margin-bottom:1rem;">
            <p>${producto.descripcion}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <button id="volver">Volver</button>
        `;

        document.querySelector("#volver").addEventListener("click", () => {
            window.history.back();
        });
    } else {
        contenedor.textContent = "❌ Producto no encontrado.";
    }
});