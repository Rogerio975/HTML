// Util: validação simples
const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
const hasLetter = (v) => /[A-Za-z]/.test(v);
const hasNumber = (v) => /\d/.test(v);

// Refs formulário principal
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberPassword = document.getElementById("rememberPassword");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const formFeedback = document.getElementById("formFeedback");

// Refs modais
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotModal = document.getElementById("forgotModal");
const recoverEmail = document.getElementById("recoverEmail");
const recoverEmailError = document.getElementById("recoverEmailError");
const cancelForgot = document.getElementById("cancelForgot");
const sendRecover = document.getElementById("sendRecover");

const createAccountBtn = document.getElementById("createAccountBtn");
const createModal = document.getElementById("createModal");
const newName = document.getElementById("newName");
const newEmail = document.getElementById("newEmail");
const newPassword = document.getElementById("newPassword");
const newNameError = document.getElementById("newNameError");
const newEmailError = document.getElementById("newEmailError");
const newPasswordError = document.getElementById("newPasswordError");
const cancelCreate = document.getElementById("cancelCreate");
const confirmCreate = document.getElementById("confirmCreate");
const createFeedback = document.getElementById("createFeedback");

// Mostrar/ocultar senha
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target || btn.previousElementSibling.id;
    const input = document.getElementById(targetId);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// Carregar "Salvar senha" (apenas para demonstração)
(function loadSaved() {
  const savedUser = localStorage.getItem("demo_username");
  const savedPass = localStorage.getItem("demo_password"); // texto puro — não use em produção
  if (savedUser) usernameInput.value = savedUser;
  if (savedPass) {
    passwordInput.value = savedPass;
    rememberPassword.checked = true;
  }
})();

// Submeter login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  usernameError.textContent = "";
  passwordError.textContent = "";
  formFeedback.textContent = "";

  const user = usernameInput.value.trim();
  const pass = passwordInput.value;

  if (!user) {
    usernameError.textContent = "Informe o usuário ou e-mail.";
    return;
  }
  if (!pass) {
    passwordError.textContent = "Informe a senha.";
    return;
  }

  // Simulação de verificação (substitua por chamada à API)
  const isValid = user.length >= 3 && pass.length >= 8;

  if (!isValid) {
    formFeedback.textContent = "Credenciais inválidas. Verifique usuário e senha.";
    formFeedback.classList.remove("success");
    return;
  }

  // Salvar credenciais (DEMO)
  if (rememberPassword.checked) {
    localStorage.setItem("demo_username", user);
    localStorage.setItem("demo_password", pass); // não faça isso em produção
  } else {
    localStorage.removeItem("demo_username");
    localStorage.removeItem("demo_password");
  }

  formFeedback.textContent = "Login efetuado com sucesso!";
  formFeedback.classList.add("success");

  // Redirecionar (exemplo)
  setTimeout(() => {
    // window.location.href = "/dashboard.html";
  }, 800);
});

// Recuperar senha — abrir/fechar modal
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  forgotModal.setAttribute("aria-hidden", "false");
  recoverEmail.value = "";
  recoverEmailError.textContent = "";
});
cancelForgot.addEventListener("click", () => {
  forgotModal.setAttribute("aria-hidden", "true");
});
sendRecover.addEventListener("click", () => {
  recoverEmailError.textContent = "";
  const email = recoverEmail.value.trim();

  if (!isEmail(email)) {
    recoverEmailError.textContent = "Informe um e-mail válido.";
    return;
  }

  // Simulação de envio (substitua por chamada à API)
  alert("Se existir uma conta com este e-mail, enviaremos instruções de recuperação.");
  forgotModal.setAttribute("aria-hidden", "true");
});

// Criar conta — abrir/fechar modal
createAccountBtn.addEventListener("click", () => {
  createModal.setAttribute("aria-hidden", "false");
  newName.value = "";
  newEmail.value = "";
  newPassword.value = "";
  newNameError.textContent = "";
  newEmailError.textContent = "";
  newPasswordError.textContent = "";
  createFeedback.textContent = "";
});
cancelCreate.addEventListener("click", () => {
  createModal.setAttribute("aria-hidden", "true");
});

confirmCreate.addEventListener("click", () => {
  newNameError.textContent = "";
  newEmailError.textContent = "";
  newPasswordError.textContent = "";
  createFeedback.textContent = "";

  const name = newName.value.trim();
  const email = newEmail.value.trim();
  const pass = newPassword.value;

  if (!name) { newNameError.textContent = "Informe seu nome."; return; }
  if (!isEmail(email)) { newEmailError.textContent = "Informe um e-mail válido."; return; }
  if (pass.length < 8 || !hasLetter(pass) || !hasNumber(pass)) {
    newPasswordError.textContent = "A senha deve ter ao menos 8 caracteres, com letra e número.";
    return;
  }

  // Simulação de criação (substitua por chamada à API)
  createFeedback.textContent = "Conta criada com sucesso! Você já pode fazer login.";
  createFeedback.classList.add("success");

  // Fechar após feedback
  setTimeout(() => {
    createModal.setAttribute("aria-hidden", "true");
  }, 1200);
});

// Fechar modal ao clicar fora do conteúdo
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    const content = modal.querySelector(".modal-content");
    if (!content.contains(e.target)) {
      modal.setAttribute("aria-hidden", "true");
    }
  });
});

// Acessibilidade: fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    forgotModal.setAttribute("aria-hidden", "true");
    createModal.setAttribute("aria-hidden", "true");
  }
});