const fetch = require("node-fetch");
class ApiService {

    constructor() {
        this.configs = {
            url: '',
            version: '',
            endpoint: '',
            params: '',
            urlCall: '',
            method: '',
            headers: {'Content-Type': 'application/json'},
            body: {},
            meta: null,
        };
    }

    setMetaConfig = (meta, remove = true) => {
        meta.filter((element) => {
            console.log()
            element.input.forEach(item => {
                if (element.attribute === 'params') {
                    this.configs[element.attribute] = this.configs[element.attribute].concat(['&', item, '=', this.configs[item]].join(''));
                } else if (element.attribute === 'body') {
                    this.configs[element.attribute][item] = this.configs[item];
                }
                delete this.configs[item];
            });
        });

        if (remove) {
            delete this.configs.meta;
        }
    }

    setConfigCall = (configs, endpoint, params = null, body = null) => {
        this.configs = {...this.configs, ...configs}
        if (this.configs.meta) {
            this.setMetaConfig(this.configs.meta)
        }
        
        this.configs.endpoint = endpoint.concat('?');
        this.configs.version = this.configs.version.concat('/');

        if (params) {
            this.configs.params = params;
        }

        this.configs.urlCall = [
            this.configs.url,
            this.configs.version,
            this.configs.endpoint, 
            this.configs.params, 
        ].join('');
    }

    call() {
        return new Promise(async (resolve, reject) => {
            try {
                const option = {
                    method: this.configs.method
                }

                if (this.configs.headers) {
                    option.headers = this.configs.headers;
                }

                if (option.method.toUpperCase() !== 'GET') {
                    option.body = JSON.stringify(this.configs.body);
                }

                const call = await fetch(this.configs.urlCall, option);
                const response = await call.json();
                response.status = call.status;
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
}


module.exports = ApiService;