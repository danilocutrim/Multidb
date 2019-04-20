const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
//npm install jsonwebtoken
const JWT = require('jsonwebtoken')
const failAction = (request, headers, error)=>{throw error}
const USER = {
    username: 'xuxadasilva',
    password: '123'
}
class AuthRoutes extends BaseRoute{
    constructor(secret){
        super()
        this.secret = secret
    }
    login(){
        return {
            path: '/login',
            method: 'POST',
            config:{
                auth:false,
                tags:['api'],
                description:'Obter Token',
                notes:'faz login com user e senha do banco',
                validate:{
                    payload:{
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                const {username,
                       password} = request.payload
                if(
                    username.toLowerCase()!== USER.username ||
                    password != USER.password
                )
                    return Boom.unauthorized()

                const token = JWT.sign({
                    username:username,
                    id:1
                }, this.secret)
                return{
                    token
                }
            }
        }
    }
}
module.exports = AuthRoutes