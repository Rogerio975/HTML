const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// "Banco" em memória (apenas para demo)
const users = {}; // { email: { passwordHash, resetCode } }

// Middleware simples de sessão via cookie (demo)
function requireAuth(req, res, next) {
  const sessionEmail = req.cookies.session_email;
  if (!sessionEmail || !users[sessionEmail]) return res.status(401).json({ error: 'Não autenticado' });
  req.user = users[sessionEmail];
  next();
}

// Login
app.post('/api/login', async (req, res) => {
  const { email, password, remember } = req.body;
  const user = users[email];
  if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Credenciais inválidas' });

  // Cookie de sessão (apenas demo)
  res.cookie('session_email', email, {
    httpOnly: true,
    sameSite: 'lax',
    // Em produção use secure: true (HTTPS) e um token aleatório
    maxAge: remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60, // 30 dias vs 1 hora
  });
  res.json({ message: 'Login bem-sucedido' });
});

// Cadastro
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (users[email]) return res.status(400).json({ error: 'E-mail já cadastrado' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Senha deve ter ao menos 6 caracteres' });
  const passwordHash = await bcrypt.hash(password, 10);
  users[email] = { passwordHash, resetCode: null };
  res.json({ message: 'Conta criada com sucesso' });
});

// Solicitar recuperação de senha
app.post('/api/forgot', (req, res) => {
  const { email } = req.body;
  const user = users[email];
  if (!user) return res.status(400).json({ error: 'E-mail não encontrado' });
  // Gerar código simples (demo). Em produção, enviar e-mail com link único.
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = code;
  console.log(`Código de reset para ${email}: ${code}`); // Log para testes
  res.json({ message: 'Código de recuperação gerado. Verifique seu e-mail (demo: veja o console do servidor).' });
});

// Resetar senha (com código)
app.post('/api/reset', async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = users[email];
  if (!user || user.resetCode !== code) return res.status(400).json({ error: 'Código inválido' });
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ error: 'Nova senha inválida' });
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetCode = null;
  res.json({ message: 'Senha alterada com sucesso' });
});

// Área autenticada (exemplo)
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ email: req.cookies.session_email });
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('session_email');
  res.json({ message: 'Logout realizado' });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));