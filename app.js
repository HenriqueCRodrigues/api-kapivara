const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./database/index');

const routes = [
    {
        file: 'pipedrive', info: [
            {path: require('./routes/pipedrive-route'), name: '/pipedrive'}
        ],
    },
    {
        file: 'bling', info: [
            {path: require('./routes/bling-route'), name: '/bling'}
        ],
    },
    {
        file: 'integration', info: [
            {path: require('./routes/integration-route'), name: '/integration'}
        ],
    }
];

db.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

db.connection.once('error', (err) => {
    console.log(err);
});

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.hader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

routes.filter(routesCollection => {
    routesCollection.info.filter(data => {
        app.use(data.name, data.path);
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    return res.send({
        erro: {
            message: error.message
        },
        status: status
    })
});

module.exports = app;