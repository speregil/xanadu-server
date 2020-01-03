/**
 * Servicio para manejar información de los retos
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var User = require('./models/user.model');              // Modelo del usuario
 var Challenge = require('./models/challenge.model')
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 /**
  * Agrega un nuevo reto a la lista de retos del usuario que entra por parámetro
  * user Nombre del usuario que acepta el reto
  * pType Tipo del reto
  * pText Texto descriptivo del reto
  */
 service.addChallenge = function(user, pType, pText, callback) {
    User.find({username: user, admin: false}, function(err, participant){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(participant[0]){
            var chal = new Challenge();
            chal.user = participant[0]._id;
            chal.type = pType;
            chal.text =  pText;
            chal.points = -1;
            chal.save(function(e, data, ver){
                if(e){
                    callback(e['errmsg']);
                }
                else{
                    callback(null);
                }
            });
        }
    });
 }

 /**
  * Retorna una lista con todos los retos del usuario que entra por parámetro
  * user Nombre del usuario
  */
 service.getChallenges = function(user, callback) {
    User.find({username: user, admin: false}, function(err, participant){
        if(err)
            callback("Error en la base de datos: " + err['errmsg'], []);
        else if(participant[0]){
            Challenge.find({user: participant[0]._id}, function(e, list){
                if(e)
                    callback("No hay retos asociados al usuario", []);
                else
                    callback(null, list);
            });
        }
    });
 }

 /**
  * Actualiza el puntaje de un reto especifico
  * challangeID Identificador único del reto
  * points Nueva calificación del reto
  */
 service.gradeChallange = function(challangeID, points, callback){
    Challenge.find({_id: challangeID}, function(err, challenge){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(challenge[0]){
            challenge[0].points = points;
            challenge[0].save(function(e, data, ver){
                if(e)
                    callback("No fue posible actualizar el desafio");
                else
                    callback(null);
            });
        }
        else
            callback("No existe ese desafio");
    });
 }

 module.exports = service;