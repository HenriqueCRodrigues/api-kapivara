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
        this.configs = {};
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
            codigo: item.id,
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

        
        let deals = await this.pipedriveRepository.getDeals(req);

        if (deals.data) {
            for (let index in deals.data) {
                let ordersBling = await this.blingRepository.storeOrder(req, deals.data[index]);
                deals.data[index] = Object.assign(deals.data[index], ordersBling); 
                collections = this.buildCollections(collections, deals.data[index]);
            }    

            await this.insertOrder(collections.data);
        }

        return collections; 
    }

    getOrdersIntegrate = async (req, res, next) => {
        let order = await Order.find({}, {
            __v: 0
        }).then(order => order);

        let response = {
            data: order,
            status: 200
        }

        return response;
    }

    insertOrder =  (array) => {
        array.filter(element => {
            if (element.numero) {
                let order = new Order(element);
                order.save();
            }
        });
    }
}

module.exports = IntegrationRepository;