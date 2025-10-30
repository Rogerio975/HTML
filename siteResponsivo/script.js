const toggleButton = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Confirmação de envio do formulário
const form = document.querySelector('.form-contato');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita envio real
    alert('Mensagem enviada com sucesso!');
    form.reset(); // Limpa os campos
  });
}