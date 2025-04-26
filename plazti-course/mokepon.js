//alert("Hola")

function seleccionarMascotaJugador() {
    alert("Seleccionaste tu mascota")
}

function iniciarJuego() {
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
}
window.addEventListener("load", iniciarJuego)