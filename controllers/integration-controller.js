const IntegrationRepository = require('../repositories/integration-repository');

class IntegrationController {

    constructor() {
        this.integrationRepository = new IntegrationRepository();
    }

    pipedriveOrderBling = async (req, res, next) => {
        let data = await this.integrationRepository.pipedriveOrderBling(req);
        res.status(data.status).send(data);
    }

    getOrdersIntegrate = async (req, res, next) => {
        let data = await this.integrationRepository.getOrdersIntegrate();
        res.status(data.status).send(data);
    }
}

module.exports = new IntegrationController();