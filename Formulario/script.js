document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('example-form');

    form.addEventListener('submit', function(event) {
        // Previne o envio do formulário para verificar os dados
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value;

        // Verificação básica dos campos
        if (nome === '' || senha === '' || email === '') {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }

        // Se todos os campos forem válidos, envie o formulário
        alert('Formulário enviado com sucesso!');
        form.submit();
    });

    // Detecta a tecla Enter e submete o formulário
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            form.requestSubmit();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});