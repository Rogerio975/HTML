const botao = document.getElementById('meuBotao');
const titulo = document.querySelector('h1');
const paragrafo = document.querySelector('p');

botao.addEventListener('click', function() {
    titulo.textContent = "Novo Título";
    paragrafo.textContent = "Novo parágrafo com conteúdo dinâmico!";
    botao.textContent = "Botão clicado";
    botao.style.backgroundColor = "#F4A460";
    paragrafo.style.color = "rgb(123,104,238)";
});