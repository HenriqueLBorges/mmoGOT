/* importar as configurações do servidor */
var app = require('./config/server');

//Set the available port or 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Set the available host
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function () {
    console.log("Server online.");
});