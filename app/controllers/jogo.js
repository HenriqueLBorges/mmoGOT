module.exports.jogo = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send("Usuário precisa estar logado...");
        return;
    }
    else {
        var msg = "";
        if (req.query.msg !== "")
            msg = req.query.msg;

        var connection = application.config.dbConnection;
        var jogoDAO = new application.app.models.JogoDAO(connection);
        jogoDAO.iniciaJogo(req, res, msg);
    }
}
module.exports.sair = function (application, req, res) {
    req.session.destroy(function () {
        res.render("index", { validacao: {} });
    });
}
module.exports.suditos = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send("Usuário precisa estar logado...");
        return;
    }
    else
        res.render("aldeoes");
}
module.exports.pergaminhos = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send("Usuário precisa estar logado...");
        return;
    }
    else{
        var connection = application.config.dbConnection;
        var jogoDAO = new application.app.models.JogoDAO(connection);
        jogoDAO.getAcoes(req, res);
    }
}
module.exports.orderna_acao_sudito = function (application, req, res) {
    var dadosForm = req.body;

    req.assert("acao", "Ação deve ser informada;").notEmpty();
    req.assert("quantidade", "Quantidade deve ser informada.").notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect("jogo?msg=A");
        return;
    }
    else {
        var connection = application.config.dbConnection;
        var jogoDAO = new application.app.models.JogoDAO(connection);
        dadosForm.usuario = req.session.usuario;
        jogoDAO.acao(dadosForm);
        res.redirect("jogo?msg=B");
    }
}
module.exports.revogarAcao = function (application, req, res) {
    var urlQuery = req.query;
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.revogarAcao(urlQuery.id, res);
}