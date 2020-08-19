const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRepository {

    setConfigsRepository = (configs) => {
        return this.configs = configs;
    }

    store = async (req, res, next) => {
        let response;
        let user = bcrypt.hash(req.password, 10).then(async hash => {
            let user = new User({
                name: req.name,
                password: hash,
                email: req.email
            });
            return await user.save().then(usr => {
                const id = usr.id;
                let token = jwt.sign({ id: id }, process.env.SECRET, {
                    expiresIn: 86400
                  });

                  response = {data: usr, token: token, status: 200};
            }).catch(err => {
                response = {data:err, status: 500};
            });    
        });

        return user;            
    }

    update = async (form, session) => {
        session.user = Object.assign(session.user, form); 
        await User.findOneAndUpdate({_id:session.user.id}, session.user).then(usr => usr);
        let response = {
            data: session.user,
            status: 200
        }

        return response; 
    }
    
    login = async (form, session) => {
        let response;
        let user = await User.find({email: form.email}, {name: 1, email: 1, password: 1, pipedrive: 1, bling: 1}) .then(result => result);

        if (!user[0]) {
            response = {data: {message:'User not found'}, status: 404};
        }

        let bool = bcrypt.compareSync(form.password, user[0].password);
        if (bool === false) {
            response = {data: {message:'Invalid password/email'}, status: 404};
        } else {
            let token = jwt.sign({ id: user[0].id}, process.env.SECRET, {
                algorithm: "HS256",
                expiresIn: 86400
            });

            session.user = {
                id:user[0].id, 
                name:user[0].name, 
                email:user[0].email, 
                pipedrive:user[0].pipedrive, 
                bling:user[0].bling,
            }

            response = {data: {header: 'x-access-token', token: token}, status: 200};
    
        }
        return response;
    }
}


module.exports = UserRepository;