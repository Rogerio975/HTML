// Este arquivo contém o código JavaScript que adiciona interatividade ao site. 
// Você pode incluir funções para manipulação do DOM, eventos de clique, validação de formulários, entre outros.

document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de função para manipulação de clique em um botão
    const button = document.getElementById('meuBotao');
    if (button) {
        button.addEventListener('click', function() {
            alert('Botão clicado!');
        });
    }

    // Exemplo de validação de formulário
    const form = document.getElementById('meuFormulario');
    if (form) {
        form.addEventListener('submit', function(event) {
            const input = document.getElementById('meuInput');
            if (input.value === '') {
                event.preventDefault();
                alert('Por favor, preencha o campo!');
            }
        });
    }
});