const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true
    },
    idPedidoBling: {
        type: Number,
        required: true,
        unique: true,
        integer: true
    },
    idPipedrive: {
        type: Number,
        required: true,
        unique: true,
        integer: true
    },
    cliente: {
        type: String,
        required: true
    },
    email_cliente: {
        type: String,
        default: 'Não Informado'
    },
    vendedor: {
        type: String,
        required: true
    },
    email_vendedor: {
        type: String,
        default: 'Não Informado'
    },
    tipoPessoa: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    un: {
        type: String,
        required: true
    },
    qtde: {
        type: Number,
        required: true,
        integer: true
    },
    vlr_unit: {
        type: Number,
        required: true
    },
    wonAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;