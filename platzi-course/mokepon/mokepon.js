//alert("Hola")

// variable de selección del tipo de ataque del jugador (VARIABLE GLOBAL)
let ataqueJugador //= document.getElementById("ataque-jugador")
//variable ataque enemigo (variable GLOBAL)
let ataqueEnemigo //= document.getElementById("ataque-enemigo")
let vidasJugador = 3//Variable global que indica las vidas del jugador
let vidasEnemigo = 3 //Variable global que indica las vidas del enemig


//funcion de iniciar juego que revisa si el navegador esta preparado
function iniciarJuego() {
    //Ocultar las secciones para que solo elija mascota
    let sectionSeleccionarAtaque = document.getElementById("ataque")
    sectionSeleccionarAtaque.style.display = 'none'
    //ocultar botón de reinicio
    let sectionBotonReiniciar = document.getElementById("reiniciar")
    sectionBotonReiniciar.style.display = 'none'
    //variables de los botones que exiten en el html
    //Botón selector de mascota para el jugador
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    //botones para los ataques
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.addEventListener("click", ataqueTierra)
    //Escuchador de enventos para el botón de reiniciar juego
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)

}


// seleccion de mascotas

//interación con el DOM para poner el nombre la mascota que 
// haz elegido y el enemigo ha elegido aleatoriamente

function seleccionarMascotaJugador() {
    //Aparecer la sección de seleccionar ataque 
    let sectionSeleccionarAtaque = document.getElementById("ataque")
    sectionSeleccionarAtaque.style.display = 'block'
    //ocultar la selección de mascota así solo pelear 
    let sectionSeleccionarMascota = document.getElementById("mascota")
    sectionSeleccionarMascota.style.display = 'none'

    let inputHipo = document.getElementById("Hipodoge")
    let inputTacu = document.getElementById("Tacupalma")
    let inputCapi = document.getElementById("Capipepo")
    let inputRati = document.getElementById("Ratigueya")
    let inputLan = document.getElementById("Langostelvia")
    let inputPy = document.getElementById("Pydos")
    let spanMascotaJugador = document.getElementById("mascota-jugador")

    //alert("Seleccionaste tu mascota")
    if (inputHipo.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputTacu.checked) {
        spanMascotaJugador.innerHTML = "Tacupalma";
    } else if (inputCapi.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRati.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else if (inputLan.checked) {
        spanMascotaJugador.innerHTML = "Langostelvia";
    } else if (inputPy.checked) {
        spanMascotaJugador.innerHTML = "Pydos";
    } else {
        alert("Selecciona mascota");
    }
    seleccionarMascotaEnemigo()

}

function seleccionarMascotaEnemigo() {
    let mascotaAletoria = aleatorio(1, 6)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")

    if (mascotaAletoria == 1) {
        spanMascotaEnemigo.innerText = "Hipodoge";
    } else if (mascotaAletoria == 2) {
        spanMascotaEnemigo.innerHTML = "Tacupalma";
    } else if (mascotaAletoria == 3) {
        spanMascotaEnemigo.innerHTML = "Capipepo";
    } else if (mascotaAletoria == 4) {
        spanMascotaEnemigo.innerHTML = "Ratigueya";
    } else if (mascotaAletoria == 5) {
        spanMascotaEnemigo.innerHTML = "Langostelvia";
    } else {
        spanMascotaEnemigo.innerHTML = "Pydos";
    }

}

//ataque de jugador

function ataqueFuego() {
    ataqueJugador = "Fuego"
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = "Agua"
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = "Tierra"
    ataqueAleatorioEnemigo()
}
//fin ataque jugador

//ataque enemigo

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Agua"
    } else {
        ataqueEnemigo = "Tierra"
    }
    combate()
}

function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje = ("EMPATE")
    } else if ((ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") ||
        (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") ||
        (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")) {
        crearMensaje = ("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje = ("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    //Revisar las vidas
    revisarVidas()

}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICIDADES GANASTE")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("QUE TRISTE PERDISTE ")
    }
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo)
    //desabilitar botones cuando se haya ganado o perdido
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.disabled = true
    //botón de reiniciar juego 
    let sectionBotonReiniciar = document.getElementById("reiniciar")
    sectionBotonReiniciar.style.display = 'block'
}


function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement('p')
    parrafo.innerHTML("Tu mascota atacó con " + ataqueJugador + " , La mascota del enemigo atacó con " + ataqueEnemigo + " " + resultado)

    sectionMensajes.appendChild(parrafo)

}

function reiniciarJuego() {
    location.reload()
}


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//fin de seleccion de mascotas 



window.addEventListener("load", iniciarJuego)