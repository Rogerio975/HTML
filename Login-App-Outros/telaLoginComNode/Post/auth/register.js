const res = await fetch("http://localhost:5500/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password })
});
const data = await res.json();
if (res.ok) {
  localStorage.setItem("token", data.token);
  // pronto para usar
} else {
  createFeedback.textContent = data.error || "Erro ao criar conta";
}
