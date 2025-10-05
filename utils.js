// Funciones auxiliares

//No se usa
export function recuperaElementoAleatorio(array) {
  // Numero de elementos en el array
  const size = array.length;

  // Numero real aleatorio entre 0 y size
  const indiceRealAleatorio = Math.random() * size;

  // Redondeo del número real obtenido al entero más próximo
  // para que se corresponda con una posición (indice) correcta.
  const indiceAleatorio = Math.floor(indiceRealAleatorio);

  // Devuelve el elemento del array ubicado en el indice aleatorio
  return array[indiceAleatorio];
}

//La de arriba pero con 2 arrays, devolviendo un elemento de cada uno
export function recuperaElementosAleatorios(array1, array2) {
  if (array1.length !== array2.length) {
    throw new Error("Los arrays deben tener la misma longitud");
  }

  // Numero de elementos en el array
  const size = array1.length;

  // Numero real aleatorio entre 0 y size
  const indiceRealAleatorio = Math.random() * size;

  // Redondeo del número real obtenido al entero más próximo
  // para que se corresponda con una posición (indice) correcta.
  const indiceAleatorio = Math.floor(indiceRealAleatorio);

  // Devuelve el elemento del array ubicado en el indice aleatorio
  return [array1[indiceAleatorio], array2[indiceAleatorio]];
}