function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function eleccion(jugada) {
    let resultado = ""
    if (jugada == 1) {
        resultado = "Piedra"
    } else if (jugada == 2) {
        resultado = "Papel"
    } else if (jugada == 3) {
        resultado = "Tijera"
    } else {
        resultado = "Elegiste PERDER x_x"
    }
    return resutado

}



let jugador = 0
let pc = 0
let triunfos = 0
let perdidad = 0

function batalla(pc, jugador) {
    let mensaje = ""
    if (pc == jugador) {
        mensaje = "Empate"
    } else if ((jugador == 1 && pc == 3) || (jugador == 2 && pc == 1) || (jugador == 3 && pc == 2)) {
        mensaje = "Ganaste"
        triunfos = triunfos + 1
    } else {
        mensaje = "Perdiste"
        perdida = perdida + 1
    }
}

while (triunfos < 3 && perdidas < 3) {
    jugador = prompt("Elige: 1 es para piedra, 2 es para papel y 3 es para tijera")
    pc = aleatorio(1, 3)
    //Jugadores PC y USUARIO
    alert("Computadora eligio " + eleccion(pc))
    alert("Tu eliges " + eleccion(jugador))

    //Batala final
    alert(batalla)

}
alert("Ganaste: " + triunfos + "veces. Perdiste: " + perdidas + "veces")
