const button = document.getElementById('change-color');
const body = document.body;

function mudarCor() {
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  body.style.backgroundColor = randomColor;
};

// Chama a função mudarCor a cada 4 segundos
setInterval(mudarCor, 4000);