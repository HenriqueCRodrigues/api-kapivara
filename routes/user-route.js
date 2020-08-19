const express = require('express');
const userController = require('../controllers/user-controller');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'post', route: '/create', function: userController.store},
            {method: 'post', route: '/login', function: userController.login},
            {method: 'put', route: '/update', function: userController.update, auth: true}
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            if (data.auth) {
                this.router[data.method](data.route, this.verifyJWT, data.function);
            } else {
                this.router[data.method](data.route, data.function);
            }
        });
    }

    verifyJWT(req, res, next){
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
}


module.exports = new UserRoute().router;