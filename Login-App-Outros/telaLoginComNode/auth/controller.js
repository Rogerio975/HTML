import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
    createUser,
    deleteResetToken,
    getResetToken,
    getUserByEmail,
    setResetToken,
    updateUserPassword
} from "./store.js";

const rounds = parseInt(process.env.BCRYPT_ROUNDS || "12", 10);
const resetExpiresMin = parseInt(process.env.RESET_TOKEN_EXPIRES_MIN || "30", 10);

const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  });
};

// Validações simples
const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
const hasLetter = (v) => /[A-Za-z]/.test(v);
const hasNumber = (v) => /\d/.test(v);

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios" });
  }
  if (!isEmail(email)) return res.status(400).json({ error: "E-mail inválido" });
  if (password.length < 8 || !hasLetter(password) || !hasNumber(password)) {
    return res.status(400).json({ error: "Senha deve ter 8+ caracteres, com letra e número" });
  }
  if (getUserByEmail(email)) {
    return res.status(409).json({ error: "E-mail já cadastrado" });
  }

  const passwordHash = await bcrypt.hash(password, rounds);
  const user = createUser({ name, email, passwordHash });

  const token = signToken(user);
  return res.status(201).json({
    message: "Conta criada com sucesso",
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "E-mail e senha são obrigatórios" });

  const user = getUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = signToken(user);
  return res.json({
    message: "Login efetuado com sucesso",
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

// Fluxo de recuperação (não revela existência da conta)
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email || !isEmail(email)) {
    return res.status(400).json({ error: "E-mail inválido" });
  }

  const user = getUserByEmail(email);
  // Sempre retorna sucesso para não vazar se o e-mail existe
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + resetExpiresMin * 60 * 1000);

  if (user) setResetToken(token, email, expiresAt);

  // Aqui você enviaria um e-mail com o link: `${APP_URL}/reset?token=${token}`
  // Para demonstração, devolvemos o token para facilitar testes.
  return res.json({
    message: "Se existir uma conta com este e-mail, enviaremos as instruções.",
    demoToken: token,
    expiresAt
  });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token e nova senha são obrigatórios" });
  }
  if (newPassword.length < 8 || !hasLetter(newPassword) || !hasNumber(newPassword)) {
    return res.status(400).json({ error: "Senha deve ter 8+ caracteres, com letra e número" });
  }

  const data = getResetToken(token);
  if (!data) return res.status(400).json({ error: "Token inválido" });

  if (new Date() > new Date(data.expiresAt)) {
    deleteResetToken(token);
    return res.status(400).json({ error: "Token expirado" });
  }

  const passwordHash = await bcrypt.hash(newPassword, rounds);
  const ok = updateUserPassword(data.email, passwordHash);
  deleteResetToken(token);

  if (!ok) return res.status(404).json({ error: "Usuário não encontrado" });

  return res.json({ message: "Senha redefinida com sucesso" });
};
