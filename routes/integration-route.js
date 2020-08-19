const express = require('express');
const integrationController = require('../controllers/integration-controller');

class IntegrationRoute {
    constructor() {
        this.router = express.Router();
        this.controller = [
            {method: 'post', route: '/pipedrive-order-bling', function: integrationController.pipedriveOrderBling},
            {method: 'get', route: '/pipedrive-order-bling', function: integrationController.getOrdersIntegrate}
        ];
        this.loadRoutes();
    }

    loadRoutes() {
        this.controller.filter(data => {
            this.router[data.method](data.route, data.function);
        });
    }
}


module.exports = new IntegrationRoute().router;