var objectID = require("mongodb").ObjectId;
function JogoDAO(connection) {
    this._connection = connection(); //"_" = Faz parte do contexto da função, não deve ser usada fora do módulo.
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("jogo", function (errCollection, collection) {
                if (!errCollection)
                    collection.insert({
                        usuario: usuario,
                        moeda: 15,
                        suditos: 10,
                        temor: Math.floor(Math.random() * 1000),
                        sabedoria: Math.floor(Math.random() * 1000),
                        comercio: Math.floor(Math.random() * 1000),
                        magia: Math.floor(Math.random() * 1000)
                    });
                mongoClient.close();
            });
        }
    });
}

JogoDAO.prototype.iniciaJogo = function (req, res, msg) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("jogo", function (errCollection, collection) {
                if (!errCollection) {
                    collection.find({ usuario: req.session.usuario }).toArray(function (err, result) {
                        if (typeof result[0] !== "undefined") {
                            res.render("jogo", { casa: req.session.casa, jogo: result[0], msg: msg });
                        }
                    });
                }
                mongoClient.close();
            });
        }
    });
}

JogoDAO.prototype.acao = function (dados) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("acao", function (errCollection, collection) {
                if (!errCollection) {
                    var date = new Date();
                    var tempo = 0;
                    switch (parseInt(dados.acao)) {
                        case 1:
                            tempo = 1 * 60 * 60000;
                            break;
                        case 2:
                            tempo = 2 * 60 * 60000;
                            break;
                        case 3:
                            tempo = 5 * 60 * 60000;
                            break;
                        case 4:
                            tempo = 5 * 60 * 60000;
                            break;
                    }
                    dados.acao_termina_em = date.getTime() + tempo;
                    collection.insert(dados);
                }
            });
            mongoClient.collection("jogo", function (errCollection, collection) {
                if (!errCollection) {
                    //Atualizar moedas
                    console.log("dados = ", dados)
                    var moedas = 0;
                    switch (parseInt(dados.acao)) {
                        case 1:
                            moedas = -2 * dados.quantidade;
                            break;
                        case 2:
                            moedas = -3 * dados.quantidade;
                            break;
                        case 3:
                            moedas = -1 * dados.quantidade;
                            break;
                        case 4:
                            moedas = -1 * dados.quantidade;
                    }
                    collection.update({ usuario: dados.usuario }, { $inc: { moeda: moedas } });
                }
            });
        }
        mongoClient.close();
    });
}

JogoDAO.prototype.getAcoes = function (req, res) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("acao", function (errCollection, collection) {
                if (!errCollection) {
                    var date = new Date();
                    var momentoAtual = date.getTime();
                    collection.find({ usuario: req.session.usuario, acao_termina_em: { $gt: momentoAtual } }).toArray(function (err, result) {
                        if (typeof result[0] !== "undefined") {
                            console.log("Result = ", result);
                            res.render("pergaminhos", { acoes: result });
                        }
                    });
                }
                mongoClient.close();
            });
        }
    });
}

JogoDAO.prototype.revogarAcao = function (id, res) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("acao", function (errCollection, collection) {
                if (!errCollection) {
                    collection.remove({ _id: objectID(id) }, function (err, result) {
                        res.redirect("/jogo?msg=D");
                    });
                }
                mongoClient.close();
            });
        }
    });
}

module.exports = function () {
    return JogoDAO;
}