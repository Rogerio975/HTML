// Aqui você pode adicionar a lógica de login, validações, etc.
const form = document.getElementById('loginForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Aqui você pode fazer a lógica de autenticação
  // Exemplo simples para mostrar mensagem no console
  console.log(`Usuário: ${username}, Senha: ${password}`);
  // Substitua essa lógica com seu próprio sistema de login
});