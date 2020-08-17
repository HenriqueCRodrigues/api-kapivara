const express = require('express');
const blingController = require('../controllers/bling-controller');

class BlingRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'post', route: '/orders', function: blingController.storeOrder}
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new BlingRoute().router;