(function () {
    /* ----------------------------- */
    /* Variables y Configuración     */
    /* ----------------------------- */

    var app = document.getElementById('app');
    var inputCaracteres = document.getElementById('numero-caracteres');

    var configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: document.getElementById('simbolos').checked,
        numeros: document.getElementById('numeros').checked,
        mayusculas: document.getElementById('mayusculas').checked,
        minusculas: true,
        ambiguos: document.getElementById('ambiguos').checked
    }

    var caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    // Lista de caracteres ambiguos a excluir
    var ambiguosChars = ['O','0','l','1'];

    /* ----------------------------- */
    /* Eventos                       */
    /* ----------------------------- */

    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Botón +
    document.getElementById('btn-mas-uno').addEventListener('click', function () {
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
    });

    // Botón -
    document.getElementById('btn-menos-uno').addEventListener('click', function () {
        if (configuracion.caracteres > 8) {
            configuracion.caracteres--;
            inputCaracteres.value = configuracion.caracteres;
        }
    });

    // Checkboxes
    document.getElementById('simbolos').addEventListener('change', function () {
        configuracion.simbolos = this.checked;
    });

    document.getElementById('numeros').addEventListener('change', function () {
        configuracion.numeros = this.checked;
    });

    document.getElementById('mayusculas').addEventListener('change', function () {
        configuracion.mayusculas = this.checked;
    });

    document.getElementById('ambiguos').addEventListener('change', function () {
        configuracion.ambiguos = this.checked;
    });

    // Generar contraseña
    document.getElementById('btn-generar').addEventListener('click', function () {
        generarPassword();
    });

    // Copiar contraseña con botón dedicado
    document.getElementById('btn-copiar').addEventListener('click', function () {
        copiarPassword();
    });

    /* ----------------------------- */
    /* Funciones                     */
    /* ----------------------------- */

    function generarPassword() {
        var caracteresFinales = '';
        var password = '';

        for (var propiedad in configuracion) {
            if (configuracion[propiedad] === true && caracteres[propiedad]) {
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }

        caracteresFinales = caracteresFinales.trim().split(' ');

        // Excluir ambiguos si está marcado
        if (configuracion.ambiguos) {
            caracteresFinales = caracteresFinales.filter(c => !ambiguosChars.includes(c));
        }

        for (var i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        }

        document.getElementById('input-password').value = password;
        evaluarFortaleza(password);
    }

    function copiarPassword() {
        var input = document.getElementById('input-password');
        input.select();
        document.execCommand("copy");

        // Cambiar ícono a "copiado"
        var btnCopiar = document.getElementById('btn-copiar');
        btnCopiar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-copy-check">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18.333 6a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-3.333 -4c1.094 0 1.828 .533 2.374 1.514a1 1 0 1 1 -1.748 .972c-.221 -.398 -.342 -.486 -.626 -.486h-10c-.548 0 -1 .452 -1 1v9.998c0 .32 .154 .618 .407 .805l.1 .065a1 1 0 1 1 -.99 1.738a3 3 0 0 1 -1.517 -2.606v-10c0 -1.652 1.348 -3 3 -3zm1.293 9.293l-3.293 3.292l-1.293 -1.292a1 1 0 0 0 -1.414 1.414l2 2a1 1 0 0 0 1.414 0l4 -4a1 1 0 0 0 -1.414 -1.414" />
            </svg>
        `;

        mostrarToast("Contraseña copiada con éxito");

        // Restaurar ícono original después de 2s
        setTimeout(function () {
            btnCopiar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-copy">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" />
                    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                </svg>
            `;
        }, 2000);
    }

    function mostrarToast(mensaje) {
        var toast = document.createElement("div");
        toast.textContent = mensaje;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "#029313";
        toast.style.color = "#ffffff";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.3)";
        toast.style.zIndex = "9999";
        toast.style.fontSize = "14px";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.5s ease";

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.opacity = "1";
        }, 100);

        setTimeout(function () {
            toast.style.opacity = "0";
            setTimeout(function () {
                document.body.removeChild(toast);
            }, 500);
        }, 2000);
    }

    function evaluarFortaleza(password) {
    let fuerza = 0;

    if (password.length >= 8) fuerza++;
    if (password.length >= 12) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[0-9]/.test(password)) fuerza++;
    if (/[^A-Za-z0-9]/.test(password)) fuerza++;

    let bar = document.getElementById('strength-bar');
    let text = document.getElementById('strength-text');

    switch (fuerza) {
        case 0:
        case 1:
            bar.style.width = "20%";
            bar.style.background = "red";
            text.textContent = "Fortaleza: Muy débil";
            break;
        case 2:
            bar.style.width = "40%";
            bar.style.background = "orange";
            text.textContent = "Fortaleza: Débil";
            break;
        case 3:
            bar.style.width = "60%";
            bar.style.background = "yellow";
            text.textContent = "Fortaleza: Media";
            break;
        case 4:
            bar.style.width = "80%";
            bar.style.background = "lightgreen";
            text.textContent = "Fortaleza: Fuerte";
            break;
        case 5:
            bar.style.width = "100%";
            bar.style.background = "green";
            text.textContent = "Fortaleza: Muy fuerte";
            break;
    }
}

/* ----------------------------- */
/* Inicialización                */
/* ----------------------------- */

// Generamos una contraseña inicial al cargar la página
generarPassword();

}()) 
