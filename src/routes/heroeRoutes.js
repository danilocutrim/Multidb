const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
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
                    return Boom.internal()
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
                    return Boom.internal()
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
                    if(result.nModified !== 1 )return Boom.preconditionRequired("Não encontrado no banco")
                    return {
                        message:'heroi atualizado com sucesso'
                    }
                }
                catch(error){
                    console.error('deu ruim', error)
                    return Boom.internal()
                }
            }
        }
    }
    delete(){
        return {
            path:'/heroi/{id}',
            method:'DELETE',
            config:{
                validate:{
                    failAction,
                    params:{
                        id: Joi.string().required()
                    }
                }
            },
            handler:async (request)=>{
                try{
                    const {id} = request.params
                    const result = await this.db.delete(id)
                    if(result.n !== 1){
                        return Boom.preconditionFailed("não foi possivel")
                    }
                    return {
                        message: 'heroi removido com sucesso'
                    }
                } catch(error){
                    console.log('deu ruim ',error)
                    return Boom.internal()

                }
            }
        }
    }


}

module.exports = HeroRoutes