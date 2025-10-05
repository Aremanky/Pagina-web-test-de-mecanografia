import { recuperaElementosAleatorios } from "./utils.js"

//Elementos del DOM
const comienzo = document.getElementById("btnComienzo");
const pausa = document.getElementById("btnpausa");
const reinicio = document.getElementById("btnReinicio");
const tiempo = document.getElementById("tiempo");
const texto = document.getElementById("entrada");
const palabraMuestra = document.getElementById("palabraDeMuestra");
const puntos = document.getElementById("puntos");
const nPalabras = document.getElementById("nPalabras");
const nTiempo = document.getElementById("nTiempo");
const palabrasCorrectas = document.getElementById("palabrasCorrectas");
const btnInfo = document.getElementById("btnInfo");
const palabrasPlus = document.getElementById("palabrasPlus");
const insertaPalabra = document.getElementById("inserta_palabra");
const btnAjustes = document.getElementById("btnAjustes");
const panelAjustes = document.getElementById("ajustes");

// Nivel fácil
const palabrasFacilEng = [
  "dog", "cat", "house", "mouse", "book", "tree", "sun", "car", "milk", "pen",
  "apple", "ball", "chair", "door", "flower", "fish", "hat", "key", "star", "bird"
];
const palabrasFacilEsp = [
  "perro", "gato", "casa", "ratón", "libro", "árbol", "sol", "coche", "leche", "bolígrafo",
  "manzana", "pelota", "silla", "puerta", "flor", "pez", "sombrero", "llave", "estrella", "pájaro"
];

// Nivel medio
const palabrasMedioEng = [
  "elephant", "giraffe", "computer", "bottle", "window", "garden", "pencil", "school", "river", "mountain",
  "camera", "friend", "market", "letter", "family", "teacher", "pencilcase", "butterfly", "backpack", "airport"
];
const palabrasMedioEsp = [
  "elefante", "jirafa", "computadora", "botella", "ventana", "jardín", "lápiz", "escuela", "río", "montaña",
  "cámara", "amigo", "mercado", "carta", "familia", "profesor", "estuche", "mariposa", "mochila", "aeropuerto"
];

// Nivel difícil
const palabrasDificilEng = [
  "programming", "javascript", "development", "algorithm", "function", "variable", "compiler", "interface", "encapsulation", "abstraction",
  "inheritance", "polymorphism", "implementation", "debugging", "optimization", "concurrency", "synchronization", "recursion", "expression", "iteration"
];
const palabrasDificilEsp = [
  "programación", "javascript", "desarrollo", "algoritmo", "función", "variable", "compilador", "interfaz", "encapsulamiento", "abstracción",
  "herencia", "polimorfismo", "implementación", "depuración", "optimización", "concurrencia", "sincronización", "recursión", "expresión", "iteración"
];

// Nivel personalizado
const personEng = [];
const personEsp = [];


//Variables globales
let idIntervalo = null;
let momento = 0;
let enPausa = true;
let limPalabras = null;
let limTiempo = null;
let palabraCheck = null;
let nivelActual = "fácil"; // por defecto
let arrayPalabras = palabrasFacilEng;
let arrayCheck = palabrasFacilEsp;

function mostrarFeedback(correcto) {
  const icono = document.getElementById("feedbackIcon");
  icono.innerHTML = correcto
    ? `<svg viewBox="0 0 24 24"><path d="M9 16.17l-3.5-3.5L4 14.17l5 5 10-10-1.41-1.41z"/></svg>`
    : `<svg viewBox="0 0 24 24"><path d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L10.59 13.4 4.3 19.71 2.88 18.29 9.17 12 2.88 5.71 4.3 4.29 10.59 10.6l6.29-6.31z"/></svg>`;

  icono.classList.remove("success", "error");
  icono.classList.add(correcto ? "success" : "error");

  // quitarlo tras 1.5 segundos
  setTimeout(() => {
    icono.classList.remove("success", "error");
  }, 1500);
}

btnAjustes.addEventListener("click", () => {
    if (panelAjustes.style.display === "none") {
        panelAjustes.style.display = "block";
        btnAjustes.textContent = "Ocultar Ajustes ⚙️";
    } else {
        panelAjustes.style.display = "none";
        btnAjustes.textContent = "Mostrar Ajustes ⚙️";
    }
});

function activarCambioNivel() {
    document.addEventListener("keydown", cambiarNivelListener);
}

function desactivarCambioNivel() {
    document.removeEventListener("keydown", cambiarNivelListener);
}

function cambiarNivelListener(e) {
    if (["1","2","3","4"].includes(e.key)) {
        document.body.classList.remove("nivel-facil", "nivel-medio", "nivel-dificil", "nivel-personalizada");
        switch(e.key) {
            case "1": 
                nivelActual = "fácil"; 
                arrayPalabras = palabrasFacilEng;
                arrayCheck = palabrasFacilEsp;
                document.body.classList.add("nivel-facil");
                break;
            case "2": 
                nivelActual = "medio"; 
                arrayPalabras = palabrasMedioEng;
                arrayCheck = palabrasMedioEsp;
                document.body.classList.add("nivel-medio");
                break;
            case "3": 
                nivelActual = "difícil"; 
                arrayPalabras = palabrasDificilEng;
                arrayCheck = palabrasDificilEsp;
                document.body.classList.add("nivel-dificil");
                break;
            case "4":
                nivelActual = "Personalizada";
                arrayPalabras = personEng;
                arrayCheck = personEsp;
                document.body.classList.add("nivel-personalizada");
                break;
        }
        document.getElementById("nivelActual").innerText = nivelActual;
    }
}

function informacion(){
    const contenido = `
    <h4>Cómo usar el test de mecanografía</h4>

  <p>Resumen rápido:</p>
  <ul>
    <li><strong>Configura antes de empezar:</strong> número de palabras y tiempo máximo en la pestaña <em>Ajustes</em>.</li>
    <li>Pulsa <strong>Comenzar Test</strong> para iniciar. Escribe la palabra mostrada y pulsa <strong>Enter</strong> para validar.</li>
    <li>Pulsa <strong>Pausar Test</strong> para detener el temporizador; vuelve a pulsar para reanudar.</li>
    <li><strong>Puntos:</strong> se suman según la longitud de la palabra en inglés mostrada.</li>
  </ul>

  <h5>Atajos y comportamiento</h5>
  <ul>
    <li><strong>Teclas 1–4</strong>: seleccionan el nivel (solo fuera del test).</li>
    <li><strong>Enter</strong>: valida la palabra escrita.</li>
    <li><strong>Esc / click en el overlay</strong>: cierran esta ventana.</li>
    <li>Antes de empezar la palabra aparece enmascarada (<code>*****</code>); al arrancar se revela.</li>
  </ul>

  <h5>Gestión de palabras</h5>
  <ul>
    <li>Usa el campo <em>Añadir palabra</em> en Ajustes con el formato: <code>english, español</code>.</li>
    <li>Si eliges Nivel 4 (Personalizada) el test usará tus listas personalizadas.</li>
  </ul>

  <h5>Privacidad y comportamiento</h5>
  <ul>
    <li>Todo el texto y las listas se guardan mientras permanezcas en el nivel, si cambias se eliminará toda adición realizada.</li>
    <li>El test no envía datos a servidores externos por defecto.</li>
  </ul>

  
  <p style="font-size:0.9rem; color:#666">El pedazo trabajo de Nico y Adrián</p>
  `;

  showModal(contenido, false);
}

function showModal(msg, showRestart = false) {
    const modal = document.getElementById('modal');
    const cuerpo = document.getElementById('modalCuerpo');
    const btnOk = document.getElementById('modalAceptar');
    const btnReset = document.getElementById('modalReset');

    cuerpo.innerHTML = typeof msg === 'string' ? `<p>${msg}</p>` : msg;
    btnReset.style.display = showRestart ? 'inline-block' : 'none';

    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
    
    function cerrar(){
        closeModal();
        btnOk.removeEventListener('click', cerrar);
        btnReset.removeEventListener('click', reiniciarYcerrar);
    }

    function reiniciarYcerrar() {
        closeModal();
        reiniciarTemporizador();
        btnOk.removeEventListener('click', cerrar);
        btnReset.removeEventListener('click', reiniciarYcerrar);
    }

    btnOk.addEventListener('click',cerrar);
    btnReset.addEventListener('click', reiniciarYcerrar);

    document.getElementById('modalOverlay').addEventListener('click',cerrar, {once:true});
    function onEsc(e){
        if(e.key==='Escape'){
            cerrar();
            document.removeEventListener('keydown', onEsc);
        }
    }
    document.addEventListener('keydown', onEsc)
}

function closeModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

//Función de botón comienzo
function comenzarTemporizador() {
    desactivarCambioNivel();
    //Validaciones
    limPalabras = nPalabras.value;
    nPalabras.disabled = true;
    
    limTiempo = nTiempo.value;
    nTiempo.disabled = true;

    tiempo.innerText = momento;
    console.log(recuperaElementosAleatorios(arrayPalabras, arrayCheck))
    //La magia de js, o se usa vbles auxiliates o no funciona
    const [aux1, aux2] = recuperaElementosAleatorios(arrayPalabras, arrayCheck);
    palabraMuestra.innerText = aux1
    palabraCheck = aux2

    pausa.disabled = false;
    comienzo.disabled = true;
    texto.disabled = false;
    continuarTest();
    texto.focus();
}

//Función que se ejecuta cada segundo para actualizar el tiempo
function actualizaTiempo() {
    //Incrementa en uno el contador de tiempo
    let valorTiempo = +tiempo.innerText;
    valorTiempo++;
    momento = valorTiempo;
    tiempo.innerText = valorTiempo.toString();

    //Comprueba si se ha llegado al límite de tiempo
    if (momento >= limTiempo) {
        showModal(`Se ha acabado el tiempo.<br>Tu puntuación es: <strong>${puntos.innerText}</strong> puntos en <strong>${tiempo.innerText}</strong> segundos.`, true);
        reiniciarTemporizador();
    }
}

//Función de botón pausa
function alternarPausa() {
    if (enPausa === true) {
        continuarTest();
    } else {
        pausarTest();
    }
}

//Funciones auxiliares de pausa
function continuarTest() {
    idIntervalo = setInterval(actualizaTiempo, 1000);
    pausa.textContent = "Pausar Test";
    enPausa = false;
    texto.disabled = false;
}

function pausarTest() {
    clearInterval(idIntervalo);
    pausa.textContent = "Reanudar Test";
    enPausa = true;
    texto.disabled = true;
}

//Función de botón reinicio
function reiniciarTemporizador() {
    activarCambioNivel();
    comienzo.disabled = false;
    pausa.disabled = true;
    pausarTest();
    nPalabras.disabled = false;
    limPalabras = null;

    momento = 0;
    tiempo.innerText = momento;
    palabraMuestra.innerText = "*******";
    texto.value = "";
    puntos.innerText = 0;
    palabrasCorrectas.innerText = 0;
    texto.disabled = true;
    nTiempo.disabled = false;
}

//Función que comprueba si la palabra escrita es correcta
function comprobarTexto(event) {
    if (event.key === 'Enter') {
        const textoNormalizado = texto.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const palabraNormalizada = palabraCheck.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const esCorrecto = textoNormalizado === palabraNormalizada;
        mostrarFeedback(esCorrecto);

        if (esCorrecto) {
            palabrasCorrectas.innerText = +palabrasCorrectas.innerText + 1;
            puntos.innerText = +puntos.innerText + palabraMuestra.innerText.length;
            const [aux1, aux2] = recuperaElementosAleatorios(arrayPalabras, arrayCheck);
            palabraMuestra.innerText = aux1;
            palabraCheck = aux2;
            texto.value = "";
            if(+palabrasCorrectas.innerText == limPalabras){
                showModal(`Has completado el test.<br>Tu puntuación: <strong>${puntos.innerText}</strong> puntos en <strong>${tiempo.innerText}</strong> segundos.`, true);
                reiniciarTemporizador();
            }
        }
    }
}

function agregarPalabra(){
    const valor = palabrasPlus.value.trim();

    if (valor === ""){
        showModal("Debes introducir una palabra");
        return;
    }

    const partes = valor.split(",").map(p => p.trim());

    if(partes.length !== 2 || partes[0] === "" || partes[1] === ""){
        showModal("<strong>Formato incorrecto.</strong> Debes introducir los datos de 1 en 1 y de la siguiente manera: ingles, español. Ejemplo: dog, perro")
        palabrasPlus.value = "";
        palabrasPlus.placeholder = `MAL, escribe así: ingles → español`;
        return;
    }

    const [ingles, espanol] = partes;
    arrayPalabras.push(ingles);
    arrayCheck.push(espanol);

    // Feedback visual
    palabrasPlus.value = "";
    palabrasPlus.placeholder = `Añadido: ${ingles} → ${espanol} :)`;

    setTimeout(() => palabrasPlus.placeholder = "Añade palabras en formato: english, español", 2000);
}

function main() {
    activarCambioNivel();
    document.body.classList.add("nivel-facil");
    comienzo.addEventListener("click", comenzarTemporizador);
    pausa.addEventListener("click", alternarPausa);
    reinicio.addEventListener("click", reiniciarTemporizador);
    texto.addEventListener("keydown", comprobarTexto);
    btnInfo.addEventListener("click", informacion)
    insertaPalabra.addEventListener("click", agregarPalabra);


    pausa.disabled = true;
    texto.disabled = true;
}

document.addEventListener("DOMContentLoaded", main);