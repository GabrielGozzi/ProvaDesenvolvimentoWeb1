const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("../models/post")
const path = require("path");


app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.set("views", path.join("C:/Users/FATEC ZONA LESTE/Downloads/CrudNode/projeto-node", "views"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("primeira_pagina")
})

app.get("/consulta", function (req, res) {
    post.findAll().then(function (post) {
        res.render("consulta", { post })
    }).catch(function (erro) {
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})
    app.post("/cadastrar", function (req, res) {
        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const cpf = req.body.cpf;
        const doacao = req.body.doacao

        // Validações

        if (!nome) {
            return res.status(400).send('O campo Nome é obrigatório.');
          }
        
          if (!/^\d+$/.test(telefone)) {
            return res.status(400).send('O campo Telefone deve conter apenas números.');
          }
        
          if (!cpf) {
              return res.status(400).send('O campo CPF é obrigatório.');
            }
            if (!doacao) {
              return res.status(400).send('O campo Doação é obrigatório.');
            }


        post.create({
            nome: req.body.nome,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            doacao: req.body.doacao
        }).then(function () {
            res.redirect("/")
        }).catch(function (erro) {
            res.send("Falha ao cadastrar os dados: " + erro)
        })
    })

    app.post("/atualizar", function (req, res) {
        post.update({
            nome: req.body.nome,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            doacao: req.body.doacao

        }, {
            where: {
                id: req.body.id
            }
        }).then(function () {
            res.redirect("/consulta")
        })
    })

    app.get("/excluir/:id", function (req, res) {
        post.destroy({ where: { id: req.params.id } })
        .then(function () {
          res.render("primeira_pagina");
        })
        .catch(function (erro) {
          console.log("Erro ao excluir ou encontrar os dados do banco: " + erro);
        });
    });

    app.get("/editar/:id", function (req, res) {
            const nome = req.body.nome;
            const telefone = req.body.telefone;
            const cpf = req.body.cpf;
            const doacao = req.body.doacao;
    
          
            // Validações
          
            if (!nome) {
              return res.status(400).send('O campo Nome é obrigatório.');
            }
          
            if (!/^\d+$/.test(telefone)) {
              return res.status(400).send('O campo Telefone deve conter apenas números.');
            }
          
            if (!cpf) {
                return res.status(400).send('O campo CPF é obrigatório.');
              }
              if (!doacao) {
                return res.status(400).send('O campo Doação é obrigatório.');
              }




        post.findAll({ where: { 'id': req.params.id } }).then(function (post) {
            res.render("editar", { post })
        }).catch(function (erro) {
            console.log("Erro ao carregar dados do banco: " + erro)
        })
    })
    app.listen(8081, function () {
        console.log("Servidor ativo!")
    })

    