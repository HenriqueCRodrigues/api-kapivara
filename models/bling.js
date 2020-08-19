const mongoose = require('mongoose');

const BlingSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true},
    params: {
        type: String,
        required: true
    },
    meta:{
        attribute:{
            type: String,
            required: true
        },
        input:{
            type: String,
            required: true
        }
    }
});

const Bling = mongoose.model('Bling', BlingSchema);
module.exports = Bling;