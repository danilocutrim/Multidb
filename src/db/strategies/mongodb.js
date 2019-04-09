const Icrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'desconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'desconectando'
}
class MongoDB extends Icrud{
    constructor(){
        super()
    }
    async isConnected(){
        const state = STATUS[this._driver.readyState]
        if(state === 'conectado') return true;
        if(state !== 'conectando') return state
         await new Promise (resolve => setTimeout(resolve, 1200))

        return STATUS[this._driver.readyState]
    }
    defineModel(){
            const heroiSchema = new Mongoose.Schema({
            nome:{
                type: String,
                require: true

            },
            poder:{
                type: String,
                require : true

            },
            insertedAt:{
                type: Date,
                default: new Date()

            }
        })
        this._herois = Mongoose.model('heroi',heroiSchema)
    }
    connect(){
        Mongoose.connect('mongodb://danilocutrim:75475668@localhost:27017/herois',{
            useNewUrlParser: true
        }, function(error){
            if(!error) return;
            console.log('falha na conexão', error)
        })
        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open',()=> console.log('database rodando'))
        this.defineModel()
    }
    create(item){
        return this._herois.create(item)
    }
    read(item, skip=0, limit=0){
        return this._herois.find(item).skip(skip).limit(limit)
    }
    update(id, item){
        return this._herois.updateOne({_id: id}, {$set: item})
    }
    delete(id){
        return this.herois.deleteOne({_id: id})
    }
}

module.exports = MongoDB