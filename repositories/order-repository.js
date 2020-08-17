class OrderRepository {
    
    getEndpoint = (req, res, next) => {      
        const Order = require('../order');
        return new Order('Lojas Americanas-2020359898');
    }
}


module.exports = OrderRepository;