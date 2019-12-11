/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var connection = require('./connection.service');       // Servicio de conexión con Mongo
 var User = require('./models/user.model');              // Modelo del usuario
 var Group = require('./models/group.model')             // Modelo del grupo
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 service.createGroup = function(groupName, masterName, callback){
    var db = connection.connect();
    var group = new Group();
    group.name = groupName;
    User.find({username: masterName}, function(err, search){
        if(err)
            callback("Error en la base de datos", null);
        else if(search[0]){
            group.master = search[0]._id;
            group.participants = new Array();
            group.save(function(err, data, ver){
                connection.disconnect(db);
                if(err){
                    callback(err['errmsg'], null);
                }
                else{
                    callback(null, data);
                }
            });
        }
        else
            callback("El maestro indicado no existe", null);
    });
 }

 service.removeGroup = function(groupName, masterName, callback){
    var db = connection.connect();
    User.find({username: masterName}, function(err, master){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(master[0]){
            Group.findOneAndDelete({name: groupName, master: master[0]._id}, function(e, search){
                connection.disconnect(db);
                if(e)
                    callback("Error en la base de datos");
                else
                    callback(null);
            });
        }
        else
            callback("El maestro indicado no existe");
    });
}

 service.getGroups = function(masterName, callback){
    var db = connection.connect();
    User.find({username: masterName, admin: true}, function(err, master){
        if(err)
            callback("Error en la base de datos", []);
        else if(master[0]){
            Group.find({master: master[0]._id}, function(err, list){
                connection.disconnect(db);
                if(err)
                    callback(err, []);
                else
                    callback(null, list);
            });
        }
        else {
            callback("Error: El maestro no existe", []);
            connection.disconnect(db);
        }
    });
 }

 service.getParticipants = function(groupName, callback){
    participants = new Array();
    check = 0;
    var db = connection.connect();
    Group.find({name: groupName}, function(err, group){
        if(err)
            callback(err, []);
        else if(group[0]){
            pList = group[0].participants;
            for ( participant of pList ) {
                check++;
                User.find({_id: participant}, function(err, user) {
                    if(err)
                        callback ("No fue posible recuperar a los participantes", []);
                    else {
                        participants.push(user[0]);
                        check--;
                        if(check <= 0) {
                            connection.disconnect(db);
                            callback(null, participants);
                        }
                    }
                });
            }
        }
        else {
            connection.disconnect(db);
            callback("El grupo no existe", []);
        }
    });
 }

 service.asign = function(groupName, userName, callback){
    var db  = connection.connect();
    Group.find({name: groupName}, function(err, group){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(group[0]){
            User.find({username: userName}, function(error, user){
                if(error)
                    callback("Error en la base de datos");
                else if(user[0]){
                    group[0].participants.push(user[0]._id);
                    group[0].save(function(err, gr, ver){
                        if(err){
                            callback("No fue asignar al participantes");
                        }else{
                            user[0].asign = true;
                            user[0].save(function(e, us, ver){
                                connection.disconnect(db);
                                if(e)
                                    callback("Cuidado, usuario: " + user[0]._id + " desactualizado");
                                else{
                                    callback(null);
                                }
                            });
                        }
                    });
                }
                else{
                    connection.disconnect(db);
                    callback("Error: El usuario no existe");
                }
            });
        }
        else {
            connection.disconnect(db);
            callback("Error: El grupo no existe");
        }
    });
 }

 service.unasign = function(groupName, userName, callback){
    var db  = connection.connect();
    Group.find({name: groupName}, function(err, group){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else if(group[0]){
            User.find({username: userName}, function(error, user){
                if(error){
                    connection.disconnect(db);
                    callback("Error en la base de datos");
                }
                else if(user[0]){
                    var participants = group[0].participants;
                    participants.splice(participants.indexOf(user[0]._id),1);
                    group[0].participants = participants;
                    group[0].save(function(err, gr, ver){
                        if(err){
                            connection.disconnect(db);
                            callback("No fue asignar al participantes");
                        }else{
                            user[0].asign = false;
                            user[0].save(function(e, us, ver){
                                connection.disconnect(db);
                                if(e)
                                    callback("Cuidado, usuario: " + user[0]._id + " desactualizado");
                                else{
                                    callback(null);
                                }
                            });
                        }
                    });
                }
                else{
                    connection.disconnect(db);
                    callback("Error: El usuario no existe");
                }
            });
        }
        else {
            connection.disconnect(db);
            callback("Error: El grupo no existe");
        }
    });
 }
 
 module.exports = service;