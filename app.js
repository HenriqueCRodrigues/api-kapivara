const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./database/index');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const session = require('express-session');

const routes = [
    {
        file: 'pipedrive', auth: true, info: [
            {path: require('./routes/pipedrive-route'), name: '/pipedrive'}
        ],
    },
    {
        file: 'bling', auth: true, info: [
            {path: require('./routes/bling-route'), name: '/bling'}
        ],
    },
    {
        file: 'integration', auth: true, info: [
            {path: require('./routes/integration-route'), name: '/integration'}
        ],
    },
    {
        file: 'user', info: [
            {path: require('./routes/user-route'), name: '/user'}
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
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

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
        if (routesCollection.auth) {
            app.use(data.name, verifyJWT, data.path);
        } else {
            app.use(data.name, data.path);
        }
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

function verifyJWT(req, res, next){
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      if(!req.session.user) {
        let user = await User.find({_id: decoded.id}).then(usr => usr);

        req.session.user = {
            id:user[0].id, 
            name:user[0].name, 
            email:user[0].email, 
            pipedrive:user[0].pipedrive, 
            bling:user[0].bling,
        }
      }

      next();
    });
}

module.exports = app;