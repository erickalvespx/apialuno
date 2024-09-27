const bd = require("./connection")
const express = require("express");
const app = express();
const cors = require('cors');
const body = require("body-parser");

app.use(body.json());

app.use (cors());

app.get("/", function(req, res){
    const select = "select * from alunos";
    bd.query(select, function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    }) 
})

app.get("/:id", function(req, res){
    const select = "select * from alunos where id_aluno = ?";
    bd.query(select, [req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    }) 
})

app.delete("/del/:id", function(req, res){
    const del = "delete from alunos where id_aluno = ?";
    bd.query(del, [req.params.id],function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Registro apagado com sucesso");
        }
    });
});

app.post("/insert", function(req, res){
    const insert = "insert INTO alunos SET nome_aluno=?, data_nascimento=?, telefone_aluno=?, email_aluno=?, data_matricula=?";
    const body = req.body;
    bd.query(insert, [body.nome_aluno, body.data_nascimento, body.telefone_aluno, body.email_aluno, body.data_matricula], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Aluno registrado com sucesso!");
        }
    });
});

app.put("/insert/:id", function(req, res){
    const update = "update alunos SET nome_aluno=?, data_nascimento=?, telefone_aluno=?, email_aluno=?, data_matricula=? WHERE id_aluno=?";
    const body = req.body;
    bd.query(update, [body.nome_aluno, body.data_nascimento, body.telefone_aluno, body.email_aluno, body.data_matricula, req.params.id], function(err, results){
        if(err){
            console.log(err);
        }else{
            res.send("Aluno atualizado com sucesso!");
        }
    });
});

app.listen(8080, function(){
    console.log("Servidor rodando na porta 8080!");
})
