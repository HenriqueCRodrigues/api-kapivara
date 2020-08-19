const IntegrationRepository = require('../repositories/integration-repository');

class IntegrationController {

    constructor() {
        this.integrationRepository = new IntegrationRepository();
    }

    pipedriveOrderBling = async (req, res, next) => {
        let data = await this.integrationRepository.pipedriveOrderBling();
        res.status(data.status).send(data);
    }


    getOrdersIntegrate = async (req, res, next) => {
        let data = await this.integrationRepository.getOrdersIntegrate();
        res.status(200).send({data: data, status: 200});
    }
}

module.exports = new IntegrationController();