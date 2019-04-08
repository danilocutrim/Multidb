const Mongoose = require('mongoose')
Mongoose.connect('mongodb://danilocutrim:75475668@localhost:27017/herois',
    {useNewUrlParser: true}, function(error){
        if(!error) return;

        console.log('falha na conexão', error)
    })

const connection = Mongoose.connection

connection.once('open',()=> console.log('database rodando'))
setTimeout(()=>{
    const state =connection.readyState

    console.log(state)

},5000)
/*
    0: desconectado
    1: conectado
    2: conectando
    3: desconectando
*/


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

const model = Mongoose.model('heroi',heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome: 'batman',
        pode:'dinheiro'
    })
    console.log('resultCadastrar',resultCadastrar)
    const lisItens = await model.find()
    console.log('item',lisItens)
}
main()