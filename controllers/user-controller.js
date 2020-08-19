const UserRepository = require('../repositories/user-repository');

class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    store = async (req, res, next) => {
        let data = await this.userRepository.store(req.body);
        res.status(200).send(data);
    }

    login = async (req, res, next) => {
        let data = await this.userRepository.login(req.body, req.session);
        res.status(data.status).send(data);
    }

    update = async (req, res, next) => {
        let data = await this.userRepository.update(req.body, req.session);
        res.status(data.status).send(data);
    }
    
}

module.exports = new UserController();