const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/kapivara', {useNewUrlParser:true, useUnifiedTopology: true});

module.exports = mongoose;