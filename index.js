const express = require('express');
const verificarAutorizacao = require('./auth');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = 3000;

// Middleware global para parsing de JSON
app.use(express.json());

// Middleware global para registrar todas as chamadas
app.use((req, res, next) => {
    console.log('Chamando API');
    next();
});

// Rota pública GET /usuarios
app.use('/usuarios', usuariosRouter);

// Rota POST protegida com middleware de autenticação
app.post('/usuarios', verificarAutorizacao, (req, res, next) => {
    // Importa o controller diretamente para esta rota específica
    const { criarUsuario } = require('./controllers/usuarioController');
    criarUsuario(req, res);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;