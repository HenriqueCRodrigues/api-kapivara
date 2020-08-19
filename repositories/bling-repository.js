const ApiService = require('../services/api-service');
const js2xmlparser = require("js2xmlparser");
const Bling = require('../models/bling');

class BlingRepository {

    constructor() {
        this.apiService = new ApiService();
        this.configs = {};
    }

    setConfigsRepository = (configs) => {
      return this.configs = configs;
    }

    setConfigs = async (req) => {
      let bling = await Bling.findOne().then(bling => bling);

      let configs = {
          url: bling.url,
          version: bling.version,
          params: bling.params,
          meta: [
            {attribute: 'params', input:['apikey', 'xml']}
          ],
          apikey: req.session.user.bling ? req.session.user.bling.apikey : '',
          method: 'POST',
          xml: ''
      };

      return configs;
    }
    
    storeOrder = async (req, deal) => {
      this.configs = await this.setConfigs(req);
      this.configs.xml = this.buildXml(deal);

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