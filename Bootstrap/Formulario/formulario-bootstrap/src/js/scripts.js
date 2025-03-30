// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form fields
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const cep = document.getElementById('cep').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const isWhatsapp = document.getElementById('whatsapp').checked;

        // Simple validation example
        if (!nome || !sobrenome || !cpf || !endereco || !cep || !cidade || !estado || !telefone || !email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Form submission logic can go here
        alert('Formulário enviado com sucesso!');
    });
});