const mongoose = require('mongoose');

const instrumentoSchema = new mongoose.Schema({
    nome: String,
    fabricante: String,
    preco: Number,
    tipo: String
});

module.exports = mongoose.model('Instrumento', instrumentoSchema);