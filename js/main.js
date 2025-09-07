import { cargarCatalogo, cargarDestacados, actualizarContadorCarrito } from "./catalogo.js";
import { initContactoForm } from "./contacto.js";
import { initMenuToggle } from "./navbar.js";
import { renderizarCarrito, vaciarCarrito } from "./carrito.js";

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();

    const btnVaciar = document.getElementById("vaciar-carrito");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
            alert("Carrito vacío")
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const pagina = window.location.pathname;

    let productosGlobal = [];

    if (pagina.includes("productos.html")) {
        fetch("./data/productos.json")
            .then(response => response.json())
            .then(data => {
                productosGlobal = data;
                cargarCatalogo(productosGlobal);

                // Filtro por búsqueda
                const buscador = document.querySelector('.buscador input');
                buscador.addEventListener('input', e => {
                    const texto = e.target.value.toLowerCase();
                    const filtrados = productosGlobal.filter(p =>
                        p.nombre?.toLowerCase().includes(texto) ||
                        p.tipo?.toLowerCase().includes(texto)
                    );
                    cargarCatalogo(filtrados);
                });

                // Filtro por tipo de mueble (botones)
                document.querySelectorAll('.btn-coleccion').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const tipo = btn.textContent.trim();
                        if (tipo === "Todos") {
                            cargarCatalogo(productosGlobal);
                        } else {
                            const filtrados = productosGlobal.filter(p => p.tipo === tipo);
                            cargarCatalogo(filtrados);
                        }
                    });
                });
            })
            .catch(err => console.error("Error al cargar el catálogo:", err));
    }
    

    // Mostrar destacados en el home
    if (pagina.endsWith("index.html") || pagina === "/" || pagina === "/Muebleria Jota Grupo 4/") {
        fetch("./data/productos.json")
            .then(response => response.json())
            .then(data => cargarDestacados(data))
            .catch(err => console.error("Error al cargar los destacados:", err));
    }

    if (pagina.includes("contacto.html")) {
        initContactoForm();
    }

    initMenuToggle();
    actualizarContadorCarrito();
    renderizarCarrito();
});
