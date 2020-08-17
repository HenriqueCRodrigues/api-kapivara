const express = require('express');
const pipedriveController = require('../controllers/pipedrive-controller');

class PipedriveRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'get', route: '/deals', function: pipedriveController.getDeals}
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new PipedriveRoute().router;