const BlingRepository = require('../repositories/bling-repository');

class BlingController {

    constructor() {
        this.blingRepository = new BlingRepository();
    }

    storeOrder = async (req, res, next) => {
        let data = await this.blingRepository.storeOrder();
        res.status(data.status).send(data);
    }
}

module.exports = new BlingController();