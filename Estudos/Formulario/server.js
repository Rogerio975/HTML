const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do PostgreSQL:', err);
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      message: 'Conexão com PostgreSQL funcionando.',
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erro ao conectar com PostgreSQL.',
      details: error.message,
    });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, phone, isWhatsapp } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: 'Nome, e-mail e telefone são obrigatórios.',
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, is_whatsapp) VALUES ($1, $2, $3, $4) RETURNING *',
      [name.trim(), email.trim(), phone.trim(), Boolean(isWhatsapp)]
    );

    return res.status(201).json({
      message: 'Contato salvo com sucesso!',
      contact: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao inserir no banco:', error);

    return res.status(500).json({
      message: 'Erro ao salvar os dados no banco.',
      details: error.message,
    });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao consultar contatos.',
      details: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
