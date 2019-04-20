const Icrud = require('../interfaces/interfaceCrud')
class ContextStrategy extends Icrud {
    // falar no constructor qual a minha estratégia de banco de dados
    constructor(database){
        super()
        this._database = database
    }
    isConnected(){
        return this._database.isConnected()
    }
    create(item){
        return this._database.create(item)
    }
    read(item, skip, limit){
        return this._database.read(item, skip, limit)
    }
    update(id, item,upsert = false){
        return this._database.update(id, item, upsert)
    }
    delete(item){
        return this._database.delete(item)
    }
    static connect(){
        return this._database.connect()
    }
}

module.exports = ContextStrategy