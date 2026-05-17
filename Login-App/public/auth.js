async function api(path, data) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data || {})
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro');
  return json;
}

// Demonstração de "salvar senha" no localStorage (não use em produção)
function saveCredentials(email, password) {
  localStorage.setItem('saved_email', email);
  localStorage.setItem('saved_password', password); // inseguro!
}
function loadCredentials() {
  return {
    email: localStorage.getItem('saved_email') || '',
    password: localStorage.getItem('saved_password') || ''
  };
}
function clearCredentials() {
  localStorage.removeItem('saved_email');
  localStorage.removeItem('saved_password');
}