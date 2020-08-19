const mongoose = require('mongoose');

const PipedriveSchema = new mongoose.Schema({
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

const Pipedrive = mongoose.model('Pipedrive', PipedriveSchema);
module.exports = Pipedrive;