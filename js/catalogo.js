export function cargarCatalogo(productos) {
    console.log(productos)
    const contenedor = document.getElementById("catalogo");
    if (!contenedor) return

    productos.forEach(p => {
        
        const div = document.createElement("div");
        div.className = "card"

        const img = document.createElement("img");
        img.src = p.imagen;
        img.alt = p.nombre;

        const h2 = document.createElement("h2");
        h2.textContent = p.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = p.descripcion;

        const precio = document.createElement("strong");
        precio.textContent = `$${p.precio}`;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregaralCarrito());

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(descripcion);
        div.appendChild(precio);
        div.appendChild(boton);

        contenedor.appendChild(div);

    })
};