export function detalleProducto(p) {
    console.log("Detalle del producto:", p);

    // Guardar el producto en localStorage
    localStorage.setItem ("productoDetalle", JSON.stringify(p));

    // Redirigir a la página de detalle
    window.location.href = "producto.html";
    const contenedor = document.getElementById("catalogo");
    if (!contenedor) return

    console.log(p)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []

    const objeto_producto = {
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        cantidad: 1
    }

    

}