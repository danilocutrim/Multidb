class NotImplementedException extends Error{
    constructor(){
        super('not implemented')
    }
}

class Icrud{
    create(item){
        throw new NotImplementedException()
    }
    read(item){
        throw new NotImplementedException()
    }
    update(id, item){
        throw new NotImplementedException()
    }
    delete(id){
        throw new NotImplementedException()
    }
}

class MongoDB extends Icrud{
    constructor(){
        super()
    }
    create(item){
        console.log('salvo em mongodb')
    }
}

class Postgres extends Icrud {
    constructor(){
        super()
    }
    create(item){
        console.log('salvo em Postgres')
    }
}
class ContextStrategy {
    // falar no constructor qual a minha estratégia de banco de dados
    constructor(strategy){
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


// const contextMongo = new ContextStrategy(new MongoDB())

// contextMongo.create();
// const contextPostgres = new ContextStrategy(new Postgres())

// contextPostgres.create();

// contextMongo.read();