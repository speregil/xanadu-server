/**
 * Servicio para manejar información de los retos
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var connection = require('./connection.service');       // Servicio de conexión con Mongo
 var User = require('./models/user.model');              // Modelo del usuario
 var Challenge = require('./models/challenge.model')
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 service.addChallenge = function(user, pType, pText, callback) {
    var db = connection.connect();
    User.find({username: user, admin: false}, function(err, participant){
        if(err)
            callback("Error en la base de datos");
        else if(participant[0]){
            var chal = new Challenge();
            chal.user = participant[0]._id;
            chal.type = pType;
            chal.text =  pText;
            chal.points = -1;
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

 service.getChallenges = function(user, callback) {
    var db = connection.connect();
    User.find({username: user, admin: false}, function(err, participant){
        if(err)
            callback("Error en la base de datos", []);
        else if(participant[0]){
            Challenge.find({user: participant[0]._id}, function(err, list){
                connection.disconnect(db);
                if(err)
                    callback("No hay retos asociados al usuario", []);
                else
                    callback(null, list);
            });
        }
    });
 }

 service.gradeChallange = function(challangeID, points, callback){
    var db = connection.connect();
    Challenge.find({_id: challangeID}, function(err, challenge){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(challenge[0]){
            challenge[0].points = points;
            challenge[0].save(function(err, data, ver){
                connection.disconnect(db);
                if(err)
                    callback("No fue posible actualizar el desafio");
                else
                    callback(null);
            });
        }
        else{
            connection.disconnect(db);
            callback("No existe ese desafio");
        }
    });
 }

 module.exports = service;