//alert("Hola")

// variable de selección del tipo de ataque del jugador (VARIABLE GLOBAL)
let ataqueJugador = document.getElementById("ataque-jugador")
//variable ataque enemigo (variable GLOBAL)
let ataqueEnemigo = document.getElementById("ataque-enemigo")

//funcion de iniciar juego que revisa si el navegador esta preparado
function iniciarJuego() {
    //variables de los botones que exiten en el html
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra = document.getElementById("click", ataqueTierra)
}


// seleccion de mascotas

//interación con el DOM para poner el nombre la mascota que 
// haz elegido y el enemigo ha elegido aleatoriamente

function seleccionarMascotaJugador() {
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
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//fin de seleccion de mascotas 



window.addEventListener("load", iniciarJuego)