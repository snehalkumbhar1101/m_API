const dbConfig = require('../config/db.config.js');

const {Sequelize, DataTypes} = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(

    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host:dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
    }
)


sequelize.authenticate()
.then(() => {
    console.log('Connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.sequelize = Sequelize
db.sequelize = sequelize

db.employees = require('./employeeModel.js')(sequelize,DataTypes)
db.roles = require('./roleModel.js')(sequelize,DataTypes)

db.employees.belongsTo(db.roles,{ foreignKey : 'r_id' })

db.sequelize.sync({ force: false })
.then(() => {
    console.log("yes re-sync done!")
})

module.exports = db 