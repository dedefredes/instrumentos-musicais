
const express = require('express');
const mongoose = require('mongoose');
const Instrumento = require('./models/Instrumento');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/loja_instrumentos')
    .then(() => console.log('MongoDB conectado!'))
    .catch(erro => console.log('Erro MongoDB:', erro));


app.get('/', (req, res) => {
    res.redirect('/instrumento');
});


app.get('/instrumento/add', (req, res) => {
    res.render('instrumento/add');
});


app.post('/instrumento/add', async (req, res) => {
    try {
        const instrumento = new Instrumento(req.body);
        await instrumento.save();

        res.render('instrumento/addok', { instrumento });
    } catch (erro) {
        res.status(500).send('Erro ao cadastrar: ' + erro.message);
    }
});


app.get('/instrumento', async (req, res) => {
    try {
        const instrumentos = await Instrumento.find();
        res.render('instrumento/lst', { instrumentos });
    } catch (erro) {
        res.status(500).send('Erro ao listar: ' + erro.message);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
