export function detalleProducto(p) {
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