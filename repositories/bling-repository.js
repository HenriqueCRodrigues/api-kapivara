const ApiService = require('../services/api-service');

class BlingRepository {

    constructor() {
        this.apiService = new ApiService();
        this.configs = {
            url: 'https://bling.com.br/Api/',
            version: 'v2',
            meta: [
                {attribute: 'params', input:['apikey', 'xml']},
            ],
            apikey: '0d1a35654d5bdd1697a911e49842323a7d522b1dff5beadc3143c40cf2f168da29f9ab04',
            method: 'post',
            xml: ''
        };
    }
    
    storeOrder = async (req, res, next) => {
        this.configs.xml = this.buildXml(req);
        this.apiService.setConfigCall(this.configs, 'pedido/json', null, req);
        let data = await this.apiService.call();
        return data; 
    }

    buildXml = (deal) => {
        const order = {
          pedido: {
            cliente: {
              nome: deal.clientName,
              tipoPessoa: 'J',
              email: deal.email,
            },
            itens: [
              {
                item: {
                  codigo: '001',
                  descricao: deal.title,
                  un: 'un',
                  qtde: 1,
                  vlr_unit: deal.value,
                },
              },
            ]
          }
        };
    
        const orderXml = js2xmlparser.parse('raiz', order, { declaration: { encoding: 'UTF-8' } })
        return orderXml
    }
}

module.exports = BlingRepository;