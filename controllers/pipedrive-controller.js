const PipedriveRepository = require('../repositories/pipedrive-repository');

class PipedriveController {

    constructor() {
        this.pipedriveRepository = new PipedriveRepository();
    }

    getDeals = async (req, res, next) => {
        let data = await this.pipedriveRepository.getDeals();
        res.status(data.status).send(data);
    }
}

module.exports = new PipedriveController();