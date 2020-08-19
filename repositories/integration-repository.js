const ApiService = require('../services/api-service');
const BlingRepository = require('../repositories/bling-repository');
const PipedriveRepository = require('../repositories/pipedrive-repository');
const Order = require('../models/order');
const { response } = require('express');

class IntegrationRepository {

    constructor() {
        this.apiService = new ApiService();
        this.blingRepository = new BlingRepository();
        this.pipedriveRepository = new PipedriveRepository();
        this.configs = [];
    }

    buildObject = (item) => {
        let object = {
            numero: item.numero,
            idPedidoBling: item.idPedido,
            idPipedrive: item.id,
            cliente: item.person_name,
            email_cliente: item.person_id.email.value,
            vendedor: item.user_id.name,
            email_vendedor: item.user_id.email,
            tipoPessoa: item.tipoPessoa || 'J',
            codigo: item.codigo,
            descricao: item.title,
            un: item.un || 'un',
            qtde: item.qtde || 1,
            vlr_unit: item.value,
            wonAt: item.won_time
        }

        return object;
    }
    buildCollections = (collections, item) => {
        if (item.pedido) {
            item = Object.assign(item, item.pedido); 
            item = this.buildObject(item);
            collections.data.push(item);
        } else if (item.erro) {
            collections.data.push(item.erro);
        }

        return collections;
    }
    
    pipedriveOrderBling = async (req, res, next) => {

        let collections = {
            data: [],
            status: 200
        };

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
        
        this.pipedriveRepository.setConfigsRepository(this.configs);
        let deals = await this.pipedriveRepository.getDeals();

        if (deals.data) {
            this.configs = {
                url: 'https://bling.com.br/Api/',
                version: 'v2',
                meta: [
                    {attribute: 'params', input:['apikey', 'xml']},
                ],
                apikey: '0d1a35654d5bdd1697a911e49842323a7d522b1dff5beadc3143c40cf2f168da29f9ab04',
                method: 'post',
                xml: ''
            }

            for (let index in deals.data) {
                this.configs.xml = deals.data[index];
                this.blingRepository.setConfigsRepository(this.configs);
                let ordersBling = await this.blingRepository.storeOrder();
                deals.data[index] = Object.assign(deals.data[index], ordersBling); 
                collections = this.buildCollections(collections, deals.data[index]);
            }    

            this.insertOrder(collections.data);

        }

        return collections; 
    }

    getOrdersIntegrate = async (req, res, next) => {
        let order =  Order.find({}, {
            __v: 0
        });

        return order;
    }

    insertOrder = (array) => {
        array.filter(element => {
            if (element.numero) {
                let order = new Order(element);
                order.save();
            }
        });
    }
}

module.exports = IntegrationRepository;