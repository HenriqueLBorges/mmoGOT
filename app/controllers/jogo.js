module.exports.jogo = function (application, req, res) {
    if (!req.session.autorizado) {
        res.send("Usuário precisa estar logado...");
        return;
    }
    else {
        var connection = application.config.dbConnection;
        var jogoDAO = new application.app.models.JogoDAO(connection);
        jogoDAO.iniciaJogo(req, res);
    }
}
module.exports.sair = function (application, req, res) {
    req.session.destroy(function () {
        res.render("index", { validacao: {} });
    });
}
module.exports.suditos = function (application, req, res) {
    res.render("aldeoes");
}
module.exports.pergaminhos = function (application, req, res) {
    res.render("pergaminhos");
}