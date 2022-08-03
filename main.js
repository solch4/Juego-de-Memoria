//inicialización de variables
let uncoveredCards = 0
let card1 = null
let card2 = null
let firstResult = null
let secondResult = null
let movements = 0
let hits = 0
let timer = false
let countS = 0
let idInterval = null

//genero n aleatorios
let n = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
n = n.sort(() => Math.random() - 0.5)
// console.log(n)

//cb
function startTimer() {
  idInterval = setInterval(() => {
    document.getElementById("timer").innerHTML = `You have been playing for: ${++countS} seconds`;
  }, 1000);
}


//funcion principal
function uncover(id) {
  if (timer === false) {
    startTimer();
    timer = true;
  }

  uncoveredCards++;
  if (uncoveredCards === 1) {
    //mostrar primer número
    card1 = document.getElementById(id);
    firstResult = n[id]; //guardo en una var el 1er resultado para dsp poder comparar con el 2do resultado
    card1.innerHTML = firstResult; //haciendo esto logramos que los 16 botones se asocien a los 16 elementos del arreglo desordenado

    //deshabilitar 1er botón
    card1.disabled = true;
  } else if (uncoveredCards === 2) {
    //mostrar 2do número
    card2 = document.getElementById(id);
    secondResult = n[id];
    card2.innerHTML = secondResult;

    //deshabilitar 1er botón
    card2.disabled = true;

    //incrementar movimientos
    document.getElementById("movements").innerHTML = `Movements: ${++movements}`;

    if (firstResult === secondResult) {
      //resetear contador de uncovered cards
      uncoveredCards = 0; //de esta manera el contador de uncovered cards se resetea y puedo volver a entrar a la func (ergo destapar un par más de cards)

      //incrementar hits
      document.getElementById("hits").innerHTML = `Hits: ${++hits}`;

      if (hits === 8) {
        document.getElementById("hits").innerHTML = `Congratulations!`;
        document.getElementById("timer").innerHTML = `You won the game in: ${countS} seconds`;
        document.getElementById("movements").innerHTML = `Movements: ${movements}, not bad!`;
        clearInterval(idInterval);
      }
    } else {
      //mostrar momentáneamente valores y volver a tapar
      setTimeout(() => {
        //si no coinciden, dsp de 0.8s vuelvo a esconder las cards y habilito los botones (además reseteo el contador de uncoveredcards para poder volver a entrar a la func)
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
      }, 800);
    }
  }
}