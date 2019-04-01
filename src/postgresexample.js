//sudo npm install sequelize pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'danilocutrim',
    '75475668',
    {
        host:'localhost',
        dialect:'postgres',
        quoteIdenfiers: false,
        operatorsAlises: false,
    }
)

async function main(){
    const Herois  = driver.define('herois',{
        id:{
            type: Sequelize.INTEGER,
            required:true,
            primaryKey:true,
            autoIncrement:true
        },
        nome:{
            type: Sequelize.STRING,
            required:true
        },
        poder:{
            type: Sequelize.STRING,
            required:true
        }
    }, {
        tableName:'tb_herois',
        feezeTableName: false,
        timestamps: false
    })
    await Herois.sync()
    await Herois.create({
        nome:'lanterna verde',
        poder:'anel'
    })
    const result = await Herois.findAll({
        raw:true
       // ,atributes:{'nome'} //traz o atributo desejado
    })
    console.log(result)
}

main()