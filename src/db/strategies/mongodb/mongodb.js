const Icrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'desconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'desconectando'
}
class MongoDB extends Icrud{
    constructor(connection, Schema){
        super()
        this._schema = Schema
        this._connection = connection
    }
    async isConnected(){
        const state = STATUS[this._connection.readyState]
        if(state === 'conectado') return true;
        if(state !== 'conectando') return state
         await new Promise (resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]
    }
    static connect(){
        Mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true
        }, function(error){
            if(!error) return;
            console.log('falha na conexão', error)
        })
        const connection = Mongoose.connection
        connection.once('open',()=> console.log('database rodando'))
        return connection
    }
    create(item){
        return this._schema.create(item)
    }
    read(item,  skip=0, limit=0){
        return this._schema.find(item).skip(skip).limit(limit)
    }
    update(id, item){
        return this._schema.updateOne({_id: id}, {$set: item})
    }
    delete(id){
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB