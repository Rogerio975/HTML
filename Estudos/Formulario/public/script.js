const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('formMessage');
const phoneInput = document.getElementById('phone');
const isWhatsappInput = document.getElementById('isWhatsapp');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const isWhatsapp = isWhatsappInput.checked;

    if (!name || !email || !phone) {
        formMessage.textContent = 'Por favor, preencha todos os campos.';
        formMessage.className = 'form-message error';
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = 'Informe um e-mail válido.';
        formMessage.className = 'form-message error';
        return;
    }

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, isWhatsapp })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao enviar formulário.');
        }

        formMessage.textContent = `Formulário enviado com sucesso, ${name}!`;
        formMessage.className = 'form-message success';
        form.reset();
    } catch (error) {
        formMessage.textContent = error.message || 'Erro ao enviar formulário.';
        formMessage.className = 'form-message error';
    }
});