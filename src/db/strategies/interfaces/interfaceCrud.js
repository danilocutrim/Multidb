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

module.exports = Icrud