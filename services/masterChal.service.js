/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var connection = require('./connection.service');       // Servicio de conexión con Mongo
 var User = require('./models/user.model');              // Modelo del usuario
 var MasterC = require('./models/masterChal.model')      // Modelo del reto
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 service.createChallenge = function(master, type, text, callback){
    var db = connection.connect();
    User.find({username: master, admin: true}, function(err, user){
        if(err)
            callback("Error en la base de datos");
        else if(user[0]){
            var chal = new MasterC();
            chal.masterID = user[0]._id;
            chal.type = type;
            chal.text =  text;
            chal.save(function(err, data, ver){
                connection.disconnect(db);
                if(err){
                    callback(err['errmsg']);
                }
                else{
                    callback(null);
                }
            });
        }
    });
 }

 service.getChallenges = function(nType, callback){
    var db = connection.connect();
    MasterC.find({type: nType}, function(err, list){
        connection.disconnect(db);
        if(err)
            callback(err, []);
        else
            callback(null, list);
    });
 }
 
 module.exports = service;