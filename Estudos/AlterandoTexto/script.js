// Obtém o elemento do parágrafo e do botão
const botao = document.getElementById('botao');
const paragrafo = document.getElementById('paragrafo');

// Adiciona um evento de "click" ao botão
botao.addEventListener('click', function() {
    // Altera o texto do parágrafo
    paragrafo.textContent = 'O texto foi alterado com sucesso! 🎉';
});