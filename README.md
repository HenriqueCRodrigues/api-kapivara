<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="250">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://s3.amazonaws.com/gupy5/production/companies/372/career/333/images/2020-05-06_22-39_logo.png" width="150"></p>

## Desafio LinkApi
Foi realizado a criação da API, que captura as oportunidades no Pipedrive e persiste no Bling e Mongodb Atlas<br>

* Melhor gestão foi adicionado a opção de cadastrar usuário
* Exceto a rota 'user/create' e 'user/login', as demais precisa do token para realizar requisições
* Após o login, basta atualizar o seu usuário, com os tokens do pipedrive e bling
* Já esta pronto para usar, não se esquece de ajustar as variáveis de ambiente

### Bônus
* Foi hospedado no heroku a aplicação: https://api-kapivara.herokuapp.com
* Foi criada uma documentação no postman: https://documenter.getpostman.com/view/6533460/T1LSC62c?version=latest#d394b3fd-56dc-4b19-8eac-6ca796a4b6d5

```
+------------+----------------------------------------+
|   Method   |                URI                     |
+------------+----------------------------------------+
|    POST    | user/create                            |
|    POST    | user/login                             |
|    PUT     | user/update                            |
|    GET     | pipedrive/deals                        |
|    POST    | bling/order                            |
|    POST    | integration/pipedrive-order-bling      |
|    GET     | integration/pipedrive-order-bling      |
+------------+----------------------------------------+
```

####  user/create
```
Rota do tipo POST, retorna o usuário cadastro e seu token de acesso.

Exemplo da requisição

{
  "name":"Henrique",
  "email":"Henrique@henrique.com",
  "password":"henrique"
}


Response esperado

{
  "data": {
    "email": "Henrique@henrique.com",
    "_id": "5f3d1ef8276ffa2783fdcf00",
    "name": "Henrique",
    "password": "$2b$10$3IR2PQjNLdsvzKlyIVbdiOtmPEwYjfKza9t4pZg0ffJv0GuK34KU.",
    "createdAt": "2020-08-19T12:45:44.129Z",
    "updatedAt": "2020-08-19T12:45:44.129Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2QxZWY4Mjc2ZmZhMjc4M2ZkY2YwMCIsImlhdCI6MTU5Nzg0MTE0NCwiZXhwIjoxNTk3OTI3NTQ0fQ.e3pwYSl14GbKvSW7X3ywnseLZfSfoGRylUF58JLhfck",
  "status": 200
}
```
<br>

####  user/login
```
Rota do tipo POST

Exemplo da requisição
{
  "email":"Henrique@henrique.com",
  "password":"henrique"
}


Response esperado

{
  "data": {
    "header": "x-access-token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2NiMDY4ZmM4ZGVjMGYzNTUzMmEwNyIsImlhdCI6MTU5Nzg0MDkxNywiZXhwIjoxNTk3OTI3MzE3fQ.rN-oaL0OeRfeBcdRONx3CHugz9L4r9e06YP_1UApHHA"
  },
  "status": 200
}
```
<br>

####  user/update
```
Rota do tipo PUT

Exemplo da requisição
{
  "email":"Henrique@henrique.com",
  "password":"henrique"
}


Response esperado

{
  "pipedrive": {
		"api_token": "890318c82ff45b1745278110e15a56193bff55b0"
	},
	"bling": {
		"apikey": "0d1a35654d5bdd1697a911e49842323a7d522b1dff5beadc3143c40cf2f168da29f9ab04"
	}
}
```
<br>

####  pipedrive/deals
```
Rota do tipo GET, retorna uma view com as informações do crawler com o link para download da planilha

Response esperado

{
  "success": true,
  "data": [
    {
      "id": 1,
      "creator_user_id": {
        "id": 11670823,
        "name": "Henrique Rodrigues",
        "email": "henrique.c.rodrigues@hotmail.com",
        "has_pic": 0,
        "pic_hash": null,
        "active_flag": true,
        "value": 11670823
      },
      "user_id": {
        "id": 11670823,
        "name": "Henrique Rodrigues",
        "email": "henrique.c.rodrigues@hotmail.com",
        "has_pic": 0,
        "pic_hash": null,
        "active_flag": true,
        "value": 11670823
      },
      "person_id": {
        "active_flag": true,
        "name": "Jose",
        "email": [
          {
            "value": "",
            "primary": true
          }
        ],
        "phone": [
          {
            "value": "",
            "primary": true
          }
        ],
        "value": 1
      },
      "org_id": null,
      "stage_id": 1,
      "title": "Negócio Jose",
      "value": 3000,
      "currency": "BRL",
      "add_time": "2020-08-13 22:37:18",
      "update_time": "2020-08-13 22:37:37",
      "stage_change_time": null,
      "active": false,
      "deleted": false,
      "status": "won",
      "probability": null,
      "next_activity_date": null,
      "next_activity_time": null,
      "next_activity_id": null,
      "last_activity_id": null,
      "last_activity_date": null,
      "lost_reason": null,
      "visible_to": "3",
      "close_time": "2020-08-13 22:37:37",
      "pipeline_id": 1,
      "won_time": "2020-08-13 22:37:37",
      "first_won_time": "2020-08-13 22:37:37",
      "lost_time": null,
      "products_count": 0,
      "files_count": 0,
      "notes_count": 0,
      "followers_count": 1,
      "email_messages_count": 0,
      "activities_count": 0,
      "done_activities_count": 0,
      "undone_activities_count": 0,
      "participants_count": 1,
      "expected_close_date": "2020-08-13",
      "last_incoming_mail_time": null,
      "last_outgoing_mail_time": null,
      "label": null,
      "stage_order_nr": 0,
      "person_name": "Jose",
      "org_name": null,
      "next_activity_subject": null,
      "next_activity_type": null,
      "next_activity_duration": null,
      "next_activity_note": null,
      "formatted_value": "R$ 3.000",
      "weighted_value": 3000,
      "formatted_weighted_value": "R$ 3.000",
      "weighted_value_currency": "BRL",
      "rotten_time": null,
      "owner_name": "Henrique Rodrigues",
      "cc_email": "linkapi10+deal1@pipedrivemail.com",
      "org_hidden": false,
      "person_hidden": false
    },
    {
      "id": 2,
      "creator_user_id": {
        "id": 11670823,
        "name": "Henrique Rodrigues",
        "email": "henrique.c.rodrigues@hotmail.com",
        "has_pic": 0,
        "pic_hash": null,
        "active_flag": true,
        "value": 11670823
      },
      "user_id": {
        "id": 11670823,
        "name": "Henrique Rodrigues",
        "email": "henrique.c.rodrigues@hotmail.com",
        "has_pic": 0,
        "pic_hash": null,
        "active_flag": true,
        "value": 11670823
      },
      "person_id": {
        "active_flag": true,
        "name": "Benedito",
        "email": [
          {
            "value": "",
            "primary": true
          }
        ],
        "phone": [
          {
            "value": "",
            "primary": true
          }
        ],
        "value": 2
      },
      "org_id": null,
      "stage_id": 1,
      "title": "Negócio Benedito",
      "value": 50000,
      "currency": "BRL",
      "add_time": "2020-08-16 21:42:05",
      "update_time": "2020-08-16 21:42:15",
      "stage_change_time": null,
      "active": false,
      "deleted": false,
      "status": "won",
      "probability": null,
      "next_activity_date": null,
      "next_activity_time": null,
      "next_activity_id": null,
      "last_activity_id": null,
      "last_activity_date": null,
      "lost_reason": null,
      "visible_to": "3",
      "close_time": "2020-08-16 21:42:15",
      "pipeline_id": 1,
      "won_time": "2020-08-16 21:42:15",
      "first_won_time": "2020-08-16 21:42:15",
      "lost_time": null,
      "products_count": 0,
      "files_count": 0,
      "notes_count": 0,
      "followers_count": 1,
      "email_messages_count": 0,
      "activities_count": 0,
      "done_activities_count": 0,
      "undone_activities_count": 0,
      "participants_count": 1,
      "expected_close_date": "2020-08-19",
      "last_incoming_mail_time": null,
      "last_outgoing_mail_time": null,
      "label": null,
      "stage_order_nr": 0,
      "person_name": "Benedito",
      "org_name": null,
      "next_activity_subject": null,
      "next_activity_type": null,
      "next_activity_duration": null,
      "next_activity_note": null,
      "formatted_value": "R$ 50.000",
      "weighted_value": 50000,
      "formatted_weighted_value": "R$ 50.000",
      "weighted_value_currency": "BRL",
      "rotten_time": null,
      "owner_name": "Henrique Rodrigues",
      "cc_email": "linkapi10+deal2@pipedrivemail.com",
      "org_hidden": false,
      "person_hidden": false
    }
  ],
  "additional_data": {
    "pagination": {
      "start": 0,
      "limit": 100,
      "more_items_in_collection": false
    }
  },
  "related_objects": {
    "user": {
      "11670823": {
        "id": 11670823,
        "name": "Henrique Rodrigues",
        "email": "henrique.c.rodrigues@hotmail.com",
        "has_pic": 0,
        "pic_hash": null,
        "active_flag": true
      }
    },
    "person": {
      "1": {
        "active_flag": true,
        "id": 1,
        "name": "Jose",
        "email": [
          {
            "value": "",
            "primary": true
          }
        ],
        "phone": [
          {
            "value": "",
            "primary": true
          }
        ]
      },
      "2": {
        "active_flag": true,
        "id": 2,
        "name": "Benedito",
        "email": [
          {
            "value": "",
            "primary": true
          }
        ],
        "phone": [
          {
            "value": "",
            "primary": true
          }
        ]
      }
    }
  },
  "status": 200
}
```
<br>

####  bling/order
```
Rota do tipo POST, retorna uma view com as informações do crawler com o link para download da planilha
Aplicação tem suporte, mas não foi realizada requisições via essa rota
```
<br>

####  integration/pipedrive-order-bling
```
Rota do tipo POST

Response Esperado

{
  "data": [
    {
      "numero": "67",
      "idPedidoBling": 9193916413,
      "idPipedrive": 1,
      "cliente": "Jose",
      "vendedor": "Henrique Rodrigues",
      "email_vendedor": "henrique.c.rodrigues@hotmail.com",
      "tipoPessoa": "J",
      "codigo": 1,
      "descricao": "Negócio Jose",
      "un": "un",
      "qtde": 1,
      "vlr_unit": 3000,
      "wonAt": "2020-08-13 22:37:37"
    },
    {
      "numero": "68",
      "idPedidoBling": 9193916593,
      "idPipedrive": 2,
      "cliente": "Benedito",
      "vendedor": "Henrique Rodrigues",
      "email_vendedor": "henrique.c.rodrigues@hotmail.com",
      "tipoPessoa": "J",
      "codigo": 2,
      "descricao": "Negócio Benedito",
      "un": "un",
      "qtde": 1,
      "vlr_unit": 50000,
      "wonAt": "2020-08-16 21:42:15"
    }
  ],
  "status": 200
}
```
<br>

####  integration/pipedrive-order-bling
```
Rota do tipo GET

Response Esperado

{
  "data": [
      {
        "email_cliente": "Não Informado",
        "email_vendedor": "henrique.c.rodrigues@hotmail.com",
        "_id": "5f3d20e83952e028a58e9cb9",
        "numero": "67",
        "idPedidoBling": 9193916413,
        "idPipedrive": 1,
        "cliente": "Jose",
        "vendedor": "Henrique Rodrigues",
        "tipoPessoa": "J",
        "codigo": "1",
        "descricao": "Negócio Jose",
        "un": "un",
        "qtde": 1,
        "vlr_unit": 3000,
        "wonAt": "2020-08-14T01:37:37.000Z",
        "createdAt": "2020-08-19T12:54:00.244Z",
        "updatedAt": "2020-08-19T12:54:00.244Z"
      },
      {
        "email_cliente": "Não Informado",
        "email_vendedor": "henrique.c.rodrigues@hotmail.com",
        "_id": "5f3d20e83952e028a58e9cba",
        "numero": "68",
        "idPedidoBling": 9193916593,
        "idPipedrive": 2,
        "cliente": "Benedito",
        "vendedor": "Henrique Rodrigues",
        "tipoPessoa": "J",
        "codigo": "2",
        "descricao": "Negócio Benedito",
        "un": "un",
        "qtde": 1,
        "vlr_unit": 50000,
        "wonAt": "2020-08-17T00:42:15.000Z",
        "createdAt": "2020-08-19T12:54:00.245Z",
        "updatedAt": "2020-08-19T12:54:00.245Z"
      }
  ],
  "status": 200
}
```
<br>


