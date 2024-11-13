const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/finance-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

const registroSchema = new mongoose.Schema({
    tipo: String,
    descricao: String,
    valor: Number,
    data: { type: Date, default: Date.now }
});

const Registro = mongoose.model('Registro', registroSchema);

app.post('/registros', async (req, res) => {
    const { tipo, descricao, valor } = req.body;
    const novoRegistro = new Registro({ tipo, descricao, valor });
    await novoRegistro.save();
    res.status(201).send(novoRegistro);
});

app.get('/registros', async (req, res) => {
    const registros = await Registro.find();
    res.send(registros);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

