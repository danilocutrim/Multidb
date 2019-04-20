const Icrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends Icrud {
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected(){
        try{
            await this._connection.authenticate()
            return true
        }
        catch(error){
            console.log('fail',error)
            return false

        }
    }
    async create(item){
        const {
            dataValues
        } = await this._schema.create(item)
        return dataValues
    }
    async read(item ={}){
        const result = this._schema.findAll({where:item, raw: true})
        return result
    }
    async update(id, item, upsert = false){
        const fn = upsert? 'upsert':'update'
        const result = await this._schema[fn](item,{where: {id}})
        return result

    }
    async delete(id){
        const query = id ? { id } :{}
        return this._schema.destroy({where: query})
    }
    static async defineModel(connection, schema){
        const model = connection.define(
            schema.nome,
            schema.schema,
            schema.options
        )
        await model.sync()
        return model
    }
    static async connect(){
        const connection = new Sequelize(
        'heroes',
        'danilocutrim',
        '75475668',
        {
            host:'localhost',
            dialect:'postgres',
            quoteIdenfiers: false,
            operatorsAlises: false,
            logging:false
            }
        )
       return connection
    }
}

module.exports = Postgres