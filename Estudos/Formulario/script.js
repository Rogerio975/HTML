const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.className = 'form-message error';
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Informe um e-mail válido.';
        formMessage.className = 'form-message error';
        return;
    }

    formMessage.textContent = `Formulário enviado com sucesso, ${name}!`;
    formMessage.className = 'form-message success';
    form.reset();
});