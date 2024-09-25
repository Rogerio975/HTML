const body = document.body;
let intervalo;

function mudarCor() {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  body.style.backgroundColor = randomColor;
}

function iniciarTrocaCor() {
  intervalo = setInterval(mudarCor, 4000);
}

function pausarTrocaCor() {
  clearInterval(intervalo);
}

const botaoIniciar = document.getElementById('start');
const botaoPausar = document.getElementById('pause');

botaoIniciar.addEventListener('click', iniciarTrocaCor);
botaoPausar.addEventListener('click', pausarTrocaCor);