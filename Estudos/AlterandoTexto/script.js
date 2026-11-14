// Obtém o elemento do parágrafo e do botão
const botao = document.getElementById('botao');
const paragrafo = document.getElementById('paragrafo');

// Guarda o texto original do parágrafo
const textoOriginal = paragrafo.textContent;

// Variável para controlar qual texto está sendo exibido
let isOriginalText = true;

// Adiciona um evento de "click" ao botão
botao.addEventListener('click', () => {
        if (isOriginalText) {
            // Se o texto atual for o original, altera para o novo
            paragrafo.textContent = 'O texto foi alterado com sucesso! 🎉';
            botao.textContent = 'Voltar para o Texto Original';
        } else {
            // Se o texto atual for o novo, retorna para o original
            paragrafo.textContent = textoOriginal;
            botao.textContent = 'Mudar Texto';
        }
        // Inverte o estado da variável
        isOriginalText = !isOriginalText;
    });