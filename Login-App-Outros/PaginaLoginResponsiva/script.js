const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação básica de email e senha (adicione suas regras aqui)
    if (email === 'usuario@exemplo.com' && senha === 'senha123') {
        alert('Login efetuado com sucesso!');
        // Redirecionar para outra página ou realizar outra ação
    } else {
        alert('Email ou senha inválidos!');
    }
});