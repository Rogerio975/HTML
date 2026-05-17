await fetch("http://localhost:5500/auth/forgot", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email })
});
// Mostrar mensagem genérica no frontend
