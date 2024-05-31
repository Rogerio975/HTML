const botao = document.getElementById('meuBotao');

botao.addEventListener('click', function() {
    botao.textContent = 'Você clicou em mim!';
    botao.style.backgroundColor = 'red';
    botao.style.color = 'white';
    botao.style.fontSize = '20px';
});