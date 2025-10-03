/**********************************************************************/
/*  PROYECTO Mecanografía      */
import { recuperaElementoAleatorio } from "./utils.js"

let identificadorIntervalo = 0;

const comienzo = document.getElementById("btnComienzo");
const pausa = document.getElementById("btnpausa");
const reinicio = document.getElementById("btnReinicio");
const tiempo = document.getElementById("tiempo");
let momento = 0;
let puntos = 0;

function main() {
    comienzo.addEventListener("click", comenzarTemporizador);
    pausa.addEventListener("click", detenerTemporizador);
    reinicio.addEventListener("click", reiniciarTemporizador)
}

function actualizaTiempo() {
    //  Incrementa en una unidad el contador de tiempo
    let valorTiempo = +tiempo.innerText;
    valorTiempo++;
    momento = valorTiempo
    tiempo.innerText = valorTiempo.toString();
}

function comenzarTemporizador() {
    if (identificadorIntervalo==0){
        tiempo.innerText = momento
        identificadorIntervalo = setInterval(actualizaTiempo,1000)
    }
}

function detenerTemporizador() {
    clearInterval(identificadorIntervalo);
    identificadorIntervalo=0;
}

function reiniciarTemporizador(){
    detenerTemporizador;
    momento = 0
    tiempo.innerText = momento
}

document.addEventListener("DOMContentLoaded", main)