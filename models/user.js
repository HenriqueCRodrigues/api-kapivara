const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        default: 'Não Informado'
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pipedrive:{
        api_token: {
            type: String
        }
    },
    bling: {
        apikey: {
            type: String
        }
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

const User = mongoose.model('User', UserSchema);
module.exports = User;