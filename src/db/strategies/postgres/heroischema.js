const Sequelize = require('sequelize')

const HeroiSchema = {
    schema:{
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
    },
    options:{
        tableName:'tb_herois',
        feezeTableName: false,
        timestamps: false
    }
}
module.exports = HeroiSchema