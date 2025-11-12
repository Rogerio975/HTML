// NÃO USE EM PRODUÇÃO. Substitua por DB.
const users = new Map(); // key: email, value: { id, name, email, passwordHash }
const resetTokens = new Map(); // key: token, value: { email, expiresAt }

let nextId = 1;

export const getUserByEmail = (email) => users.get(email.toLowerCase()) || null;

export const createUser = ({ name, email, passwordHash }) => {
  const key = email.toLowerCase();
  if (users.has(key)) return null;
  const user = { id: nextId++, name, email: key, passwordHash };
  users.set(key, user);
  return user;
};

export const setResetToken = (token, email, expiresAt) => {
  resetTokens.set(token, { email: email.toLowerCase(), expiresAt });
};

export const getResetToken = (token) => resetTokens.get(token) || null;

export const deleteResetToken = (token) => resetTokens.delete(token);

export const updateUserPassword = (email, passwordHash) => {
  const user = users.get(email.toLowerCase());
  if (!user) return false;
  user.passwordHash = passwordHash;
  return true;
};