/**
 * Servicio para manejar el regtistro de notificaciones de un master a sus usuarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var connection = require('./connection.service');       // Servicio de conexión con Mongo
 var User = require('./models/user.model');              // Modelo del usuario
 var Notification = require('./models/notification.model')             // Modelo de la notificación
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 service.addNotification = function(user, mensaje, callback){
    var db = connection.connect();
    User.find({username: user, admin: false}, function(err, user){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(user[0]){
            var notification = new Notification();
            notification.user = user[0]._id;
            notification.mensaje = mensaje;
            notification.save(function(err, data, ver){
                connection.disconnect(db);
                if(err){
                    callback(err['errmsg']);
                }
                else{
                    callback(null);
                }
            });
        }
        else {
            connection.disconnect(db);
            callback("No fue posible encontrar al usuario");
        }
    });
 }

 service.getNotifications = function(usuario, callback){
    var db = connection.connect();
    User.find({username: usuario, admin: false}, function(err, find){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(find[0]){
            Notification.find({user : find[0]._id}, function(err, list){
                connection.disconnect(db);
                if(err)
                    callback(err, []);
                else
                    callback(null, list);
            });
        }
    });
 }

 service.whipeNotifications = function(usuario, callback){
    var db = connection.connect();
    User.find({username: usuario, admin: false}, function(err, find){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(find[0]){
            Notification.deleteMany({user: find[0]._id}, function(err){
                connection.disconnect(db);
                if(err)
                    callback("No fue posible eliminar las notificaciones");
                else
                    callback(null);
            });
        }
    });
 }
 
 module.exports = service;