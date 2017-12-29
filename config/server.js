/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

//Express-session
var expressSession = require("express-session");

/* configurar o middleware express-validator */
app.use(expressValidator());

//Configurar o middleware express-session
app.use(expressSession({
	secret: "dasdasjiqwejiq2kmmkq32e,ç12çne12kienlk3çmeli23m", //Segredo para assinar o cookei de sessão (id de referência para acesso as variaveis de sessão do lado do servidor)
	resave: false, //Salva a sessão do usuário mesmo não havendo alterações
	saveUninitialized: false //Cria uma sessão nova sempre que a mesma for modificada
}));


/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then("config/dbConnection.js")
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;