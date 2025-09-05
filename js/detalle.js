document.addEventListener("DOMContentLoaded", () => {

    // Obtener el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"));

    if (!idProducto) {
        console.error("No se encontró el ID del producto en la URL");
        return;
    }

    // Contenedor donde se renderizará el producto
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    // Cargar productos desde el JSON
    fetch("./data/productos.json")
        .then(res => res.json())
        .then(productos => {
            // Buscar el producto que coincide con el ID
            const producto = productos.find(p => p.id === idProducto);

            if (!producto) {
                contenedor.innerHTML = "<p>Producto no encontrado</p>";
                return;
            }

            // Crear la tarjeta del producto
            contenedor.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <h3>$${producto.precio.toLocaleString("es-AR")}</h3>
                <button id="agregarCarrito">Agregar al carrito</button>
            `;

            // Evento del botón "Agregar al carrito"
            document.getElementById("agregarCarrito").addEventListener("click", () => {
                // Aquí llamás tu función de carrito
                agregaralCarrito(producto);
            });
        })
        .catch(err => console.error("Error al cargar productos:", err));

});