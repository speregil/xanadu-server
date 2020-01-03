/**
 * Servicio para manejar el regtistro de notificaciones de un master a sus usuarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var User = require('./models/user.model');                     // Modelo del usuario
 var Notification = require('./models/notification.model')      // Modelo de la notificación
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 /**
  * Agrega una nueva notificación a la lista del usuario que entra por parámetro
  * user Nombre del usuario
  * mensaje Contenido de la notificación
  */
 service.addNotification = function(user, mensaje, callback){
    User.find({username: user, admin: false}, function(err, user){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(user[0]){
            var notification = new Notification();
            notification.user = user[0]._id;
            notification.mensaje = mensaje;
            notification.save(function(e, data, ver){
                if(e)
                    callback(e['errmsg']);
                else
                    callback(null);
            });
        }
        else
            callback("No fue posible encontrar al usuario");
    });
 }

 /**
  * Retorna una lista con todas las notificaciones de usuario que entra por parámetro
  * usuario Nombre del usuario
  */
 service.getNotifications = function(usuario, callback){
    User.find({username: usuario, admin: false}, function(err, find){
        if(err)
            callback("Error en la base de datos: " + err['errmsg'], []);
        else if(find[0]){
            Notification.find({user : find[0]._id}, function(e, list){
                if(e)
                    callback(e['errmsg'], []);
                else
                    callback(null, list);
            });
        }
    });
 }

 /**
  * Elimina todas las notificaciones de la lista de usuario que entra por parámetro
  * usuario Nombre del usuario
  */
 service.whipeNotifications = function(usuario, callback){
    User.find({username: usuario, admin: false}, function(err, find){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(find[0]){
            Notification.deleteMany({user: find[0]._id}, function(e){
                if(e)
                    callback("No fue posible eliminar las notificaciones");
                else
                    callback(null);
            });
        }
    });
 }
 
 module.exports = service;