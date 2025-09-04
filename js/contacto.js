// contacto.js
export function initContactoForm() {
    const formulario = document.getElementById('contacto');
    if (!formulario) return; // si no existe el form en la página, no hace nada

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        // limpio mensajes de error/éxito anteriores
        const mensajePrevio = document.querySelector('.form-message');
        if (mensajePrevio) {
            mensajePrevio.remove();
        }

        // capturo valores
        const nombre = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('message').value.trim();

        if (nombre === '' || email === '' || mensaje === '') {
            mostrarMensaje('Por favor, completa todos los campos.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarMensaje('Por favor, introduce un correo electrónico válido.', 'error');
            return;
        }
        
        console.log('Formulario enviado:', { nombre, email, mensaje });

        mostrarMensaje('¡Mensaje enviado con éxito! Gracias por contactarnos.');

        formulario.reset();
    });

    function mostrarMensaje(texto, tipo = 'exito') {
        const divMensaje = document.createElement('div');
        divMensaje.textContent = texto;
        divMensaje.classList.add('form-message');

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

        if (tipo === 'exito') {
            setTimeout(() => {
                divMensaje.remove();
            }, 5000);
        }
    }
}
