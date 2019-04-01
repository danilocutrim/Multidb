const Icrud = require('./interfaces/interfaceCrud')

class MongoDB extends Icrud{
    constructor(){
        super()
    }
    create(item){
        console.log('salvo em mongodb')
    }
}

module.exports = MongoDB