const Icrud = require('./interfaces/interfaceCrud')

class Postgres extends Icrud {
    constructor(){
        super()
    }
    create(item){
        console.log('salvo em Postgres')
    }
}

module.exports = Postgres