// const form = document.getElementById('contacto');
// const formu = document.getElementById('contacto');
// const nombre = document.getElementById('name');
// const email = document.getElementById('email');
// const mensaje = document.getElementById('message');


// formu.addEventListener('submit', function(event) {
//     event.preventDefault(); // Evita el envío del formulario
//     console.log('Nombre:', nombre.value);
//     alert('Gracias por contactarnos. Nos pondremos en contacto contigo pronto.');
//     formu.reset(); // Opcional: Resetea el formulario después del envío
// });

// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('contacto');

    formulario.addEventListener('submit', function (event) {
        
        event.preventDefault();

        // limpio mensajes de error/éxito anteriores
        const mensajePrevio = document.querySelector('.form-message');
        if (mensajePrevio) {
            mensajePrevio.remove();
        }

        // 4. capturo los valores de los campos del formulario
        // .trim() elimina espacios en blanco al inicio y al final
        const nombre = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('message').value.trim();

        // realizo validaciones
        if (nombre === '' || email === '' || mensaje === '') {
            mostrarMensaje('Por favor, completa todos los campos.', 'error');
            return;
        }

        // email debe tenre formato valido 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarMensaje('Por favor, introduce un correo electrónico válido.', 'error');
            return;
        }
        
        console.log('Formulario enviado:', { nombre, email, mensaje });

        mostrarMensaje('¡Mensaje enviado con éxito! Gracias por contactarnos.');

        formulario.reset();
    });

    /**
     * Función para mostrar un mensaje en el DOM
     * @param {string} texto - El texto del mensaje a mostrar.
     * @param {string} tipo - 'exito' o 'error' para aplicar diferentes estilos.
     */
    function mostrarMensaje(texto, tipo = 'exito') {
        const divMensaje = document.createElement('div');
        divMensaje.textContent = texto;
        divMensaje.classList.add('form-message'); // Clase para identificarlo

        // Estilos para el mensaje
        divMensaje.style.padding = '10px';
        divMensaje.style.marginTop = '15px';
        divMensaje.style.textAlign = 'center';
        divMensaje.style.borderRadius = '5px';

        if (tipo === 'error') {
            divMensaje.style.backgroundColor = '#f8d7da';
            divMensaje.style.color = '#721c24';
        } else {
            divMensaje.style.backgroundColor = '#d4edda';
            divMensaje.style.color = '#155724';
        }
        
        formulario.insertAdjacentElement('afterend', divMensaje);

        // si da mensaje de éxito, lo eliminamos después de 5 segundos
        if (tipo === 'exito') {
            setTimeout(() => {
                divMensaje.remove();
            }, 5000);
        }
    }
});