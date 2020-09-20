/**
 * Servicio para manejar el regtistro de retos creados por los master
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var User = require('./models/user.model');              // Modelo del usuario
 var MasterC = require('./models/masterChal.model')      // Modelo del reto
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 /**
  * Crea un nuevo reto asociado al master que entra por parámetro
  * master Master que crea el reto
  * type Tipo del reto
  * text Texto descriptivo del reto
  */
 service.createChallenge = function(master, type, text, callback){
    User.find({username: master, admin: true}, function(err, user){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(user[0]){
            var chal = new MasterC();
            chal.masterID = user[0]._id;
            chal.type = type;
            chal.text =  text;
            chal.save(function(e, data, ver){
                if(e)
                    callback(e['errmsg']);
                else
                    callback(null);
            });
        }
		else
			callback("El master: " + master + " no existe");
    });
 }

 /**
  * Retorna una lista de todos los retos creados por masters que posean el tipo que entra por parámetro
  * nType Tipo de reto a buscar
  */
 service.getChallenges = function(nType, callback){
    MasterC.find({type: nType}, function(err, list){
        if(err)
            callback(err['errmsg'], []);
        else
            callback(null, list);
    });
 }
 
 /**
  * Retorna una lista de todos los retos creados por el master que entra por parámetro
  * master Nombre de usuario del master a consultar
  */
 service.getChallengesOf = function(master, callback){
    User.find({username: master, admin: true}, function(err, user){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
		else if(user[0]){
			MasterC.find({masterID: user[0]._id}, function(e, list){
				if(err)
					callback(e['errmsg'], []);
				else
					callback(null, list);
			});
		}
		else
			callback("El master: " + master + " no existe");
    });
 }
 
 /**
  * Elimina el reto especificado
  * challangeID Identificador del reto a eliminar
  */
 service.deleteChallenge = function(challengeID, callback){
		MasterC.findOneAndDelete({_id: challengeID}, function(err, search){
			if(err)
				callback("Error en la base de datos: " + err['errmsg']);
			else
				callback(null);
		});
 }
 
 module.exports = service;