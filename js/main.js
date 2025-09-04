import { cargarCatalogo } from "./catalogo.js";
import { initContactoForm } from "./contacto.js";
import {initMenuToggle} from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
    const pagina = window.location.pathname;
    console.log(pagina);

    if (pagina.includes("productos.html")) {
        fetch("./data/productos.json")
            .then(response => response.json())
            .then(data => cargarCatalogo(data))
            .catch(error => console.error("Error al cargar el catálogo:", error));
    }

    if (pagina.includes("contacto.html")) {
        initContactoForm();
    }

    initMenuToggle();

});
