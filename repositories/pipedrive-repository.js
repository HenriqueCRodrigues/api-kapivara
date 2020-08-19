const ApiService = require('../services/api-service');
const Pipedrive = require('../models/pipedrive');

class PipedriveRepository {

    constructor() {
        this.apiService = new ApiService();
        this.configs = {};
    }
    
    setConfigsRepository = (configs) => {
        return this.configs = configs;
    }

    setConfigs = async (req) => {
        let pipe = await Pipedrive.findOne().then(pipe => pipe);

        let configs = {
            url: pipe.url,
            version: pipe.version,
            params: pipe.params,
            meta: [
                {attribute: 'params', input:['api_token']}
            ],
            api_token: req.session.user.pipedrive ? req.session.user.pipedrive.api_token : '',
            method: 'GET'
        };

        return configs;
    }

    getDeals = async (req, res, next) => {
        this.configs = await this.setConfigs(req);
        this.apiService.setConfigCall(this.configs, 'deals');
        let data = await this.apiService.call();
        return data; 
    }
}


module.exports = PipedriveRepository;