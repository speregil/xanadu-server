/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

 var User = require('./models/user.model');              // Modelo del usuario
 var Group = require('./models/group.model')             // Modelo del grupo
 
 //-----------------------------------------------------------------------------------------------------
 // Servicio
 //-----------------------------------------------------------------------------------------------------
 
 var service = {};

 /**
  * Crea un nuevo grupo asociado al master que entra por parametro
  * groupName Nombre del nuevo grupo
  * masterName Nombre de usuario del maestro que crea el grupo
  */
 service.createGroup = function(groupName, masterName, callback){
    var group = new Group();
    group.name = groupName;
    User.find({username: masterName, admin: true}, function(err, search){
        if(err)
            callback("Error en la base de datos: " + err['errmsg'], null);
        else if(search[0]){
            Group.find({name: groupName, master: search[0]._id}, function(error, list){
                if(list[0])
                    callback("Grupo duplicado para el master: " + masterName);
                else{
                    group.master = search[0]._id;
                    group.participants = new Array();
                    group.save(function(error, data, ver){
                        if(error)
                            callback(error['errmsg'], null);
                        else
                            callback(null, data);
                    });
                }
            });
        }
        else
            callback("El maestro indicado no existe", null);
    });
 }

 /**
  * Elimina el grupo que entra por parametro
  * groupName Nombre del grupo
  * masterName Nombre de usuario del master al que pertenece el grupo
  */
 service.removeGroup = function(groupName, masterName, callback){
    User.find({username: masterName}, function(err, master){
        if(err){
            callback("Error en la base de datos: " + err['errmsg']);
        }
        else if(master[0]){
            Group.findOneAndDelete({name: groupName, master: master[0]._id}, function(e, search){
                if(e)
                    callback("Error en la base de datos: " + e['errmsg']);
                else
                    callback(null);
            });
        }
        else
            callback("El maestro indicado no existe");
    });
}

/**
 * Retorna una lista con todos los grupos creados por el master que entra por parametro
 * masterName Nombre de usuario del Master
 */
service.getGroups = function(masterName, callback){
    User.find({username: masterName, admin: true}, function(err, master){
        if(err)
            callback("Error en la base de datos: " + err['errmsg'], []);
        else if(master[0]){
            Group.find({master: master[0]._id}, function(error, list){
                if(error)
                    callback(error['errmsg'], []);
                else
                    callback(null, list);
            });
        }
        else 
            callback("Error: El maestro no existe", []);
    });
 }

 /**
  * Retorna una lista con todos los participantes del grupo cuyo nombre entra por parámetro
  * groupName Nombre del grupo
  * masterName Nombre del master al que le pertenece el grupo
  */
 service.getParticipants = function(groupName, masterName, callback){
    participants = new Array();
    check = 0;
    User.find({username: masterName, admin: true}, function(err, master){
        if(err)
            callback("Error en la base de datos: " + err['errmsg'], []);
        else if(master[0]){
            Group.find({name: groupName, master: master[0]._id}, function(error, group){
                if(err)
                    callback(error['errmsg'], []);
                else if(group[0]){
                    pList = group[0].participants;
                    if(pList.length > 0){
                        for ( participant of pList ) {
                            check++;
                            User.find({_id: participant}, function(e, user) {
                                if(e)
                                    callback ("No fue posible recuperar a los participantes", []);
                                else {
                                    participants.push(user[0]);
                                    check--;
                                    if(check <= 0)   
                                        callback(null, participants);
                                }
                            });
                        }
                    }
                    else
                        callback("No hay participantes en este grupo", []);
                }
            });
        }
        else 
            callback("El grupo no existe", []);
    });
 }

 /**
  * Asigna el usuario cuyo nombre llega por parametro al grupo del master correspondiente
  * groupName Nombre del grupo
  * masterName Nombre del master encargado
  * userName Nombre del usuario a asignar
  */
 service.asign = function(groupName, masterName, userName, callback){
    User.find({username: masterName, admin: true}, function(err, master){
        if(err)
            callback("Error en la base de datos: " + err['errmsg']);
        else if(master[0]){
            Group.find({name: groupName, master: master[0]._id}, function(error, group){
                if(error)
                    callback("Error en la base de datos: " + error['errmsg']);
                else if(group[0]){
                    User.find({username: userName}, function(e, user){
                        if(e)
                            callback("Error en la base de datos: " + e['errmsg']);
                        else if(user[0]){
                            group[0].participants.push(user[0]._id);
                            group[0].save(function(er, gr, ver){
                                if(er)
                                    callback("No fue asignar al participantes");
                                else{
                                    user[0].asign = true;
                                    user[0].save(function(errr, us, ver){
                                        if(errr)
                                            callback("Cuidado, usuario: " + user[0]._id + " desactualizado");
                                        else
                                            callback(null);
                                    });
                                }
                            });
                        }
                    });
                }
                else
                    callback("Error: El usuario no existe");
            });
        }
        else
            callback("Error: El grupo no existe");
    });
 }

 /**
  * Desasigna un usuario del grupo que entra por parametro
  * groupName Nombre del grupo
  * masterName Nombre del master encargado
  * userName Nombre del usuario
  */
 service.unasign = function(groupName, masterName, userName, callback){
    User.find({username: masterName, admin: true}, function(error, master){
        if(error)
            callback("Error en la base de datos: " + error['errmsg']);
        else if(master[0]){
            Group.find({name: groupName, master: master[0]._id}, function(err, group){
                if(err)
                    callback("Error en la base de datos");
                else if(group[0]){
                    User.find({username: userName}, function(er, user){
                        if(er)
                            callback("Error en la base de datos");
                        else if(user[0]){
                            var participants = group[0].participants;
                            participants.splice(participants.indexOf(user[0]._id),1);
                            group[0].participants = participants;
                            group[0].save(function(e, gr, ver){
                                if(e)
                                    callback("No fue asignar al participantes");
                                else{
                                    user[0].asign = false;
                                    user[0].save(function(ex, us, ver){
                                    if(ex)
                                        callback("Cuidado, usuario: " + user[0]._id + " desactualizado");
                                    else
                                        callback(null);
                                    });
                                }
                            });
                        }
                    });
                }
                else
                    callback("Error: El usuario no existe");
            });
        }
        else 
            callback("Error: El grupo no existe");
    });
 }
 
 module.exports = service;