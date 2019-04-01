const Icrud = require('../interfaces/interfaceCrud')
class ContextStrategy extends Icrud {
    // falar no constructor qual a minha estratégia de banco de dados
    constructor(strategy){
        super()
        this._datase = strategy
    }
    create(item){
        return this._datase.create(item)
    }
    read(item){
        return this._database.read(item)
    }
    update(id, item){
        return this._datase.update(item)
    }
    delete(item){
        return this._datase.delete(item)
    }
}

module.exports = ContextStrategy