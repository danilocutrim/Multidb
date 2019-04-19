const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (request, headers, erro)=>{throw erro}
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroi',
            method: 'GET',
            config:{
                validate:{
                    failAction: (request, headers, erro)=>{
                        throw erro
                    },
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try{
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query
                    const query = nome ? {
                        nome: {$regex: `.*${nome}*.`} // lista todo mundo que possui esse nome com um operador especial do mongo db
                    } : {}
                return this.db.read(nome ? query : {}, parseInt(skip), parseInt(limit))
                } catch(error) {
                    console.log('Deu ruimm',error)
                    return "erro interno no servidor"
                }
            }
        }
    }
    create(){
        return {
            path:'/heroi',
            method: 'POST',
            config:{
                validate:{
                    failAction,
                    payload:{
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request)=>{
                try{
                    const {nome, poder} = request.payload
                    const result = await this.db.create({
                        nome,
                        poder
                        })
                    return{
                        message: "heroi cadastrado com sucesso",
                        _id : result._id
                    }
                } catch(error){
                    console.log('DEU RUIM', error)
                    return 'Internal Error'
                }
            }
        }
    }
    update(){
        return{
            path: '/heroi/{id}',
            method:'PATCH',
            config:{
                validate:{
                    params :{
                        id: Joi.string().required()
                    },
                    payload:{
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async(request)=>{
                try{
                    const {
                        id
                        } = request.params
                    const {
                        payload
                        } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    const result = await this.db.update(id, dados)
                    console.log('result',result)
                    if(result.nModified !== 1 )return {
                        message: 'Não foi possivel atualizar'
                    }
                    return {
                        message:'heroi atualizado com sucesso'
                    }
                }
                catch(error){
                    console.error('deu ruim', error)
                    return 'erro interno'
                }
            }
        }
    }


}

module.exports = HeroRoutes