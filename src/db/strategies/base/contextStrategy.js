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
    read(item){
        return this._database.read(item)
    }
    update(id, item){
        return this._database.update(item)
    }
    delete(item){
        return this._database.delete(item)
    }
    connect(){
        return this._database.connect()
    }
}

module.exports = ContextStrategy