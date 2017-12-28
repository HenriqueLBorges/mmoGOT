module.exports.index = function (application, req, res) {
    res.render("index", {validacao: {}});
}
module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body;

    req.assert("usuario", "Usuario não pode ser vazio").notEmpty();
    req.assert("senha", "Senha não pode ser vazia").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        console.log("erros = ", erros)
        res.render("index", {validacao: erros});
        return;
    }

    else{
        var connection = application.config.dbConnection;
        var usuariosDAO = new application.app.models.UsuariosDAO(connection);

        usuariosDAO.autenticar(dadosForm, req, res);
    }
}