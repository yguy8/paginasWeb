(function () {
    /* ----------------------------- */
    /* Variables y Objetos Generales */
    /* ----------------------------- */

    var app = document.getElementById('app');
    var inputCaracteres = document.getElementById('numero-caracteres');

    // Configuración inicial
    var configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: document.getElementById('simbolos').checked,
        numeros: document.getElementById('numeros').checked,
        mayusculas: document.getElementById('mayusculas').checked,
        minusculas: true
    }

    var caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    /* ----------------------------- */
    /* Eventos */
    /* ----------------------------- */

    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Botón +
    app.elements.namedItem('btn-mas-uno').addEventListener('click', function () {
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
    });

    // Botón -
    app.elements.namedItem('btn-menos-uno').addEventListener('click', function () {
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

    // Generar contraseña
    app.elements.namedItem('btn-generar').addEventListener('click', function () {
        generarPassword();
    });

    // Copiar contraseña
    app.elements.namedItem('input-password').addEventListener('click', function () {
        copiarPassword();
    });

    /* ----------------------------- */
    /* Funciones */
    /* ----------------------------- */

    function generarPassword() {
        var caracteresFinales = '';
        var password = '';

        for (var propiedad in configuracion) {
            if (configuracion[propiedad] === true) {
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }

        caracteresFinales = caracteresFinales.trim().split(' ');

        for (var i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        }

        app.elements.namedItem('input-password').value = password;
    }

    function copiarPassword() {
        var input = app.elements.namedItem('input-password');
        input.select();
        document.execCommand("copy");

        mostrarToast("Contraseña copiada con éxito ✅");
    }

    // Toast flotante
    function mostrarToast(mensaje) {
        var toast = document.createElement("div");
        toast.textContent = mensaje;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.background = "#1596d2";
        toast.style.color = "#fff";
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

    // Generar contraseña inicial
    generarPassword();
}())
