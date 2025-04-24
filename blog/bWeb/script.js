function moverCuadro() {
    const cuadro = document.getElementById('cuadro');
    const nuevaPosicionTop = Math.random() * (window.innerHeight - 100);
    const nuevaPosicionLeft = Math.random() * (window.innerWidth - 100);

    cuadro.style.top = nuevaPosicionTop + 'px';
    cuadro.style.left = nuevaPosicionLeft + 'px';
}
