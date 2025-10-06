# Mecanografía — Test interactivo

Proyecto: test de mecanografía estático (HTML, CSS, JS). Interfaz ligera para medir rapidez y precisión en escribir palabras en varios niveles.

---

## ¿Qué es esto?

Una web estática (HTML + CSS + JavaScript modular) para practicar mecanografía en distintos niveles (fácil, medio, difícil y personalizado). Es simple, accesible y pensada para usarse offline en el navegador.

---

## Archivos principales

* `index.html` — Estructura de la página y modal de ayuda.
* `style.css` — Estilos ligeros y temas según nivel.
* `script.js` — Lógica del test: temporizador, validaciones, control de niveles, feedback visual y gestión de palabras.
* `utils.js` — Utilidades (selección aleatoria de palabras).

---

## ¿Cómo usarlo?

1. Abre `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
2. Pulsa **Mostrar Ajustes** para configurar número de palabras o tiempo máximo.
3. Selecciona el nivel con las teclas **1–4** (antes de empezar) o deja el predeterminado.
4. Pulsa **Comenzar Test**, escribe la palabra mostrada y presiona **Enter** para validar.
5. Usa **Pausar / Reanudar** si necesitas interrumpir.

---

## Características destacadas

* **4 niveles**: fácil, medio, difícil y personalizada (puedes añadir tus propias palabras).
* **Temporizador** y límite por número de palabras.
* **Feedback visual** inmediato (icono y animación) para aciertos/errores.
* **Modal de ayuda** con atajos y reglas.
* **Sin tracking ni envíos externos**: todo se ejecuta en el cliente.

---

## Decisiones técnicas y por qué

* Mensajes y UI ligeros: quería algo que no sobrecarge la vista.
* Separación clara entre lógica (`script.js`) y utilidades (`utils.js`) para facilitar pruebas futuras.
* Normalización de texto (sin acentos) para comparar entradas y evitar falsos negativos.

---

## Licencia

Licencia MIT — libre para uso, revisión y mejora.
