// Este arquivo contém o código JavaScript que adiciona interatividade às páginas. 

document.addEventListener("DOMContentLoaded", function() {
    // Função para validar o formulário de contato
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (name && email && message) {
                alert("Mensagem enviada com sucesso!");
                form.reset();
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    // Função para exibir uma mensagem de boas-vindas na página principal
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (welcomeMessage) {
        welcomeMessage.innerText = "Bem-vindo ao nosso site!";
    }
});