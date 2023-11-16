const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('html', mustacheExpress());//Vamos setar a engine html para fuincionar de acordo com o motor mustache
app.set('view engine', 'html'); //Informando que a viem engine do html está configurada
app.set('views',__dirname + '/views'); //indicando para o mustache onde estão as telas

app.use(express.urlencoded({extended:true}));

const  PORT = 8080;
app.listen(PORT, () => {
    console.log('app rodando na porta 8080');
})

app.get('/', (req, res) => {
    res.render("index.html");
})

app.post("/marcar_consulta", (req, res) => {
    let dados_pessoais = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        email: req.body.email,
        telefone: req.body.telefone
    }

    let erros = [];

    for (const atributo in dados_pessoais){
        const valor = dados_pessoais[atributo];
        if(valor == ""){
            erros.push({nome_atributo: atributo, mensagem: "Não pode ser vazio!"});
        }
    }
    
    res.render("dados_consulta.html",{dados_pessoais});
});