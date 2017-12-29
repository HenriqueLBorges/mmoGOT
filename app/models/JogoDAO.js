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

JogoDAO.prototype.iniciaJogo = function (req, res) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("jogo", function (errCollection, collection) {
                if (!errCollection) {
                    collection.find({usuario: req.session.usuario}).toArray(function (err, result) {
                        if (typeof result[0] !== "undefined"){
                            res.render("jogo", { casa: req.session.casa, jogo: result[0] });
                        }
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