const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configura o Express para servir arquivos da pasta atual
app.use(express.static(__dirname));

// Rota principal (ao acessar localhost:3000, abre o login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});