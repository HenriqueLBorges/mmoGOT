function UsuariosDAO(connection) {
    this._connection = connection(); //"_" = Faz parte do contexto da função, não deve ser usada fora do módulo.
}

UsuariosDAO.prototype.inserirUsuario = function (dados) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("usuarios", function (errCollection, collection) {
                if (!errCollection)
                    collection.insert(dados);
                mongoClient.close();
            });
        }
    });
}

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {
    this._connection.open(function (err, mongoClient) {
        if (!err) {
            mongoClient.collection("usuarios", function (errCollection, collection) {
                if (!errCollection) {
                    collection.find(usuario).toArray(function (err, result) {
                        if (typeof result[0] !== "undefined"){
                            req.session.autorizado = true; //Variável de sessão criada!
                            req.session.usuario = result[0].usuario;
                            req.session.casa = result[0].casa;
                        }
                        if (req.session.autorizado)
                            res.redirect("jogo");
                        else res.render("index", {validacao: [{msg: "Usuário não existe."}]});
                    });
                }
                mongoClient.close();
            });
        }
    });
}

module.exports = function () {
    return UsuariosDAO;
}