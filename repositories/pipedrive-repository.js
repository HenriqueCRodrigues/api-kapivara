const ApiService = require('../services/api-service');

class PipedriveRepository {

    constructor() {
        this.apiService = new ApiService();
        this.configs = {
            url: 'https://api.pipedrive.com/',
            version: 'v1',
            params: 'status=won&start=0',
            meta: [
                {attribute: 'params', input:['api_token']}
            ],
            api_token: '890318c82ff45b1745278110e15a56193bff55b0',
            method: 'GET'
        };
    }
    
    getDeals = async (req, res, next) => {
        this.apiService.setConfigCall(this.configs, 'deals');
        let data = await this.apiService.call();
        return data; 
    }
}


module.exports = PipedriveRepository;