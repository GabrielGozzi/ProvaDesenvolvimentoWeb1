const Sequelize = require("sequelize")
const sequelize = new Sequelize("test", "root", '', {
    host: "127.0.0.1",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}