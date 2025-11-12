const res = await fetch("http://localhost:5500/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: userOrEmail, password: pass })
});
const data = await res.json();
if (res.ok) {
  localStorage.setItem("token", data.token); // use somente token, nunca senha
  // redirecionar...
} else {
  formFeedback.textContent = data.error || "Erro ao entrar";
}