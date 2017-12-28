var mongo = require("mongodb");
var connectMongo = function(){
    console.log("DB started");
    var db = new mongo.Db(
        "got",
        new mongo.Server(
            "localhost", //host
            27017, //port
            {}), //aditional config
        {} //aditional config
    );

    return db;
}
module.exports = function(){
    return connectMongo;
}