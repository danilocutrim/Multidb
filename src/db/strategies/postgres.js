const Icrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends Icrud {
    constructor(){
        super()
        this._driver = null
        this._herois = null
        this._connect()
    }
    async isConnected(){
        try{
            await this._driver.authenticate()
            return true
        }
        catch(error){
            console.log('fail',error)
            return false

        }
    }
    create(item){
        console.log('salvo em Postgres')
    }
    async defineModel(){
        this._herois = _driver.define('herois',{
            id:{
                type: Sequelize.INTEGER,
                required:true,
                primaryKey:true,
                autoIncrement:true
            },
            nome:{
                type: Sequelize.STRING,
                required:true
            },
            poder:{
                type: Sequelize.STRING,
                required:true
            }
        }, {
            tableName:'tb_herois',
            feezeTableName: false,
            timestamps: false
        })
        await Herois.sync()
    }
    _connect(){
        this._driver = new Sequelize(
        'heroes',
        'danilocutrim',
        '75475668',
        {
            host:'localhost',
            dialect:'postgres',
            quoteIdenfiers: false,
            operatorsAlises: false,
        }
    )}
}

module.exports = Postgres