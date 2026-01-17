//modo oscuro boton 

const btnModoOscuro = document.getElementById("btn-modoOscuro");

btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modoOscuro");

  // Guardar preferencia
  if (document.body.classList.contains("modoOscuro")) {
    localStorage.setItem("theme", "modoOscuro");
  } else {
    localStorage.setItem("theme", "claro");
  }
});

// Aplicar preferencia al cargar
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "modoOscuro") {
    document.body.classList.add("modoOscuro");
  }
});


(function () {
  /* ----------------------------- */
  /* Variables y configuración     */
  /* ----------------------------- */

  const app = document.getElementById('app');
  const inputCaracteres = document.getElementById('numero-caracteres');
  const inputPassword = document.getElementById('input-password');
  const btnGenerar = document.getElementById('btn-generar');
  const btnCopiar = document.getElementById('btn-copiar');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  const alertaCopiado = document.getElementById('alerta-copiado');

  const MIN_LEN = 8;
  const MAX_LEN = 64;

  const configuracion = {
    caracteres: parseInt(inputCaracteres.value, 10),
    simbolos: document.getElementById('simbolos').checked,
    numeros: document.getElementById('numeros').checked,
    mayusculas: document.getElementById('mayusculas').checked,
    minusculas: true,
    ambiguos: document.getElementById('ambiguos').checked
  };

  const caracteres = {
    numeros: '0 1 2 3 4 5 6 7 8 9',
    simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
    mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
  };

  const ambiguosChars = ['O', '0', 'l', '1'];

  /* ----------------------------- */
  /* Utilidades seguras            */
  /* ----------------------------- */

  function getRandomInt(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }

  function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /* ----------------------------- */
  /* Generación de contraseña      */
  /* ----------------------------- */

  function construirPool() {
    let pool = '';

    // Añadir categorías activas
    if (configuracion.numeros) pool += caracteres.numeros + ' ';
    if (configuracion.simbolos) pool += caracteres.simbolos + ' ';
    if (configuracion.mayusculas) pool += caracteres.mayusculas + ' ';
    if (configuracion.minusculas) pool += caracteres.minusculas + ' ';

    let poolArray = pool.trim().split(' ').filter(Boolean);

    // Excluir ambiguos si aplica
    if (configuracion.ambiguos) {
      poolArray = poolArray.filter(c => !ambiguosChars.includes(c));
    }

    return poolArray;
  }

  function generarPassword() {
    const pool = construirPool();

    // Si el pool queda vacío, no generamos
    if (pool.length === 0) {
      setPassword('');
      actualizarFortaleza('');
      mostrarAlerta('No hay caracteres disponibles. Ajusta las opciones.', true);
      return;
    }

    const pwd = [];

    // Garantizar categorías seleccionadas
    if (configuracion.numeros) {
      const nums = caracteres.numeros.split(' ');
      pwd.push(nums[getRandomInt(nums.length)]);
    }
    if (configuracion.simbolos) {
      const syms = caracteres.simbolos.split(' ');
      pwd.push(syms[getRandomInt(syms.length)]);
    }
    if (configuracion.mayusculas) {
      const mays = caracteres.mayusculas.split(' ');
      pwd.push(mays[getRandomInt(mays.length)]);
    }
    if (configuracion.minusculas) {
      const mins = caracteres.minusculas.split(' ');
      pwd.push(mins[getRandomInt(mins.length)]);
    }

    // Rellenar hasta longitud requerida
    while (pwd.length < configuracion.caracteres) {
      pwd.push(pool[getRandomInt(pool.length)]);
    }

    // Mezclar para evitar patrones
    mezclarArray(pwd);

    const resultado = pwd.join('');
    setPassword(resultado);
    actualizarFortaleza(resultado);
    mostrarAlerta('Contraseña generada', false);
  }

  /* ----------------------------- */
  /* Copiado al portapapeles       */
  /* ----------------------------- */

  async function copiarPassword() {
    const valor = inputPassword.value || '';
    if (!valor) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(valor);
      } else {
        // Fallback
        inputPassword.select();
        document.execCommand('copy');
      }
      mostrarAlerta('Contraseña copiada con éxito', false);
      estadoBotonCopiar(true);
    } catch (e) {
      mostrarAlerta('No se pudo copiar. Intenta manualmente.', true);
    }
  }

  /* ----------------------------- */
  /* Fortaleza y accesibilidad     */
  /* ----------------------------- */

  function actualizarFortaleza(password) {
    let fuerza = 0;

    if (password.length >= 8) fuerza++;
    if (password.length >= 12) fuerza++;
    if (/[A-Z]/.test(password)) fuerza++;
    if (/[0-9]/.test(password)) fuerza++;
    if (/[^A-Za-z0-9]/.test(password)) fuerza++;

    let width = 0;
    let color = '#ff0000';
    let texto = 'Fortaleza: Muy débil';

    switch (fuerza) {
      case 0:
      case 1:
        width = 20; color = '#ff0000'; texto = 'Fortaleza: Muy débil'; break;
      case 2:
        width = 40; color = '#ffa500'; texto = 'Fortaleza: Débil'; break;
      case 3:
        width = 60; color = '#ffff00'; texto = 'Fortaleza: Media'; break;
      case 4:
        width = 80; color = '#adea06'; texto = 'Fortaleza: Fuerte'; break;
      case 5:
        width = 100; color = '#0ad000'; texto = 'Fortaleza: Muy fuerte'; break;
    }

    strengthBar.style.width = width + '%';
    strengthBar.style.background = color;
    strengthBar.setAttribute('aria-valuenow', String(width));
    strengthText.textContent = texto;
  }

  function mostrarAlerta(mensaje, esError) {
    // Usa el contenedor accesible existente
    alertaCopiado.textContent = mensaje;
    alertaCopiado.classList.toggle('active', true);
    alertaCopiado.style.color = esError ? '#ff5252' : ''; // rojo si error

    // Limpia después de un tiempo
    setTimeout(() => {
      alertaCopiado.classList.toggle('active', false);
      alertaCopiado.textContent = '';
      alertaCopiado.style.color = '';
    }, 2000);
  }

  /* ----------------------------- */
  /* Estados UI                    */
  /* ----------------------------- */

  function setPassword(valor) {
    inputPassword.value = valor;
    estadoBotonCopiar(Boolean(valor));
  }

  function estadoBotonCopiar(habilitar) {
    btnCopiar.disabled = !habilitar;
  }

  /* ----------------------------- */
  /* Eventos                       */
  /* ----------------------------- */

  app.addEventListener('submit', e => e.preventDefault());

  document.getElementById('btn-mas-uno').addEventListener('click', () => {
    if (configuracion.caracteres < MAX_LEN) {
      configuracion.caracteres++;
      inputCaracteres.value = configuracion.caracteres;
    }
  });

  document.getElementById('btn-menos-uno').addEventListener('click', () => {
    if (configuracion.caracteres > MIN_LEN) {
      configuracion.caracteres--;
      inputCaracteres.value = configuracion.caracteres;
    }
  });

  inputCaracteres.addEventListener('input', function () {
    const valor = parseInt(this.value, 10);
    if (!Number.isNaN(valor) && valor >= MIN_LEN && valor <= MAX_LEN) {
      configuracion.caracteres = valor;
      this.setCustomValidity('');
    } else {
      this.setCustomValidity(`Elige entre ${MIN_LEN} y ${MAX_LEN} caracteres.`);
    }
  });

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

  btnGenerar.addEventListener('click', generarPassword);
  btnCopiar.addEventListener('click', copiarPassword);

  /* ----------------------------- */
  /* Inicialización                */
  /* ----------------------------- */

  // No generamos automáticamente para que el botón "Copiar" empiece deshabilitado
  setPassword('');
  actualizarFortaleza('');
})();
