const db = require("./banco")

const Doacoes = db.sequelize.define('doacoes',{
    nome:{
        type: db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.INTEGER
    },
    cpf:{
        type: db.Sequelize.INTEGER
    },
    doacao:{
        type: db.Sequelize.INTEGER
    },
})

module.exports = Doacoes