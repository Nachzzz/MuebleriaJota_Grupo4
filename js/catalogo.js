import { detalleProducto } from "./detalle.js";

function crearEstrellas(valor = 5) {
    const max = 5;
    let html = "";
    for (let i = 1; i <= max; i++) {
        html += `<span class="estrella">${i <= valor ? "★" : "☆"}</span>`;
    }
    return html;
}

function crearTarjetaProducto(p) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("placa");

    const valoracion = document.createElement("div");
    valoracion.classList.add("valoracion-estrellas");
    valoracion.innerHTML = crearEstrellas(p.valoracion || 5);
    tarjeta.appendChild(valoracion);

    const imagen = document.createElement("img");
    imagen.src = p.imagen;
    imagen.alt = p.nombre;
    tarjeta.appendChild(imagen);

    const nombre = document.createElement("h2");
    nombre.textContent = p.nombre;
    tarjeta.appendChild(nombre);

    const descripcion = document.createElement("p");
    descripcion.textContent = p.descripcion;
    tarjeta.appendChild(descripcion);

    const precio = document.createElement("h3");
    precio.textContent = `$${p.precio}`;
    tarjeta.appendChild(precio);

    const botonDetalle = document.createElement("button");
    botonDetalle.textContent = "Ver Detalle";
    botonDetalle.addEventListener("click", () => detalleProducto(p));
    tarjeta.appendChild(botonDetalle);

    const botonCarrito = document.createElement("button");
    botonCarrito.textContent = "Agregar al carrito";
    botonCarrito.addEventListener("click", () => agregarAlCarrito(p));
    tarjeta.appendChild(botonCarrito);

    return tarjeta;
}

export function cargarCatalogo(productos) {
    const contenedor = document.getElementById("catalogo");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    productos
        .filter(p => p.nombre) // Filtra productos válidos
        .forEach(p => {
            const tarjeta = crearTarjetaProducto(p);
            contenedor.appendChild(tarjeta);
        });
}

export function cargarDestacados(productos) {
    const contenedor = document.getElementById("destacados-home");
    if (!contenedor) return;

    // Selecciona los primeros 4 productos válidos
    const destacados = productos.filter(p => p.nombre).slice(0, 4);

    contenedor.innerHTML = "";
    destacados.forEach(p => {
        const tarjeta = crearTarjetaProducto(p);
        contenedor.appendChild(tarjeta);
    });
}

function mostrarMensajeCarrito(texto, tipo = 'exito') {
    const mensajePrevio = document.querySelector('.carrito-message');
    if (mensajePrevio) mensajePrevio.remove();

    const divMensaje = document.createElement('div');
    divMensaje.textContent = texto;
    divMensaje.classList.add('carrito-message');
    divMensaje.style.padding = '10px';
    divMensaje.style.marginTop = '15px';
    divMensaje.style.textAlign = 'center';
    divMensaje.style.borderRadius = '5px';
    divMensaje.style.position = 'fixed';
    divMensaje.style.top = '24px';
    divMensaje.style.left = '50%';
    divMensaje.style.transform = 'translateX(-50%)';
    divMensaje.style.zIndex = '9999';
    divMensaje.style.minWidth = '220px';

    if (tipo === 'error') {
        divMensaje.style.backgroundColor = '#f8d7da';
        divMensaje.style.color = '#721c24';
    } else {
        divMensaje.style.backgroundColor = '#d4edda';
        divMensaje.style.color = '#155724';
    }

    document.body.appendChild(divMensaje);

    if (tipo === 'exito') {
        setTimeout(() => {
            divMensaje.remove();
        }, 3500);
    }
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarMensajeCarrito("Producto agregado al carrito", "exito");
}

export function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contador.textContent = carrito.length;
    contador.style.display = carrito.length > 0 ? "inline-block" : "none";
}