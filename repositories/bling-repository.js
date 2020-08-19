const ApiService = require('../services/api-service');
const js2xmlparser = require("js2xmlparser");

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

    setConfigsRepository = (configs) => {
      return this.configs = configs;
    }
    
    storeOrder = async (req, res, next) => {
        this.configs.xml = this.buildXml(this.configs.xml);
        this.apiService.setConfigCall(this.configs, 'pedido/json', null, req);
        let data = await this.apiService.call();
        
        if (data.retorno.pedidos) {
            data = data.retorno.pedidos[0];
        
        } else if (data.retorno.erros) {
          data = data.retorno.erros[0];
        }

        return data; 
    }

    buildXml = (deal) => {
        const order = {
            cliente: {
              nome: deal.person_name,
              tipoPessoa: 'J',
              email: deal.person_id.email.value,
            },
            itens: [
              {
                item: {
                  codigo: deal.id,
                  descricao: deal.title,
                  un: 'un',
                  qtde: 1,
                  vlr_unit: deal.value,
                },
              },
            ]
        };
    
        const orderXml = encodeURIComponent(js2xmlparser.parse('pedido', order, { declaration: { encoding: 'UTF-8' } }));
        return orderXml
    }
}

module.exports = BlingRepository;