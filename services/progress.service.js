/**
 * Servicio para manejar el progreso en el juego del usuario
 */

 //------------------------------------------------------------------------------------------
 // Requerimientos
 //------------------------------------------------------------------------------------------

var connection = require('./connection.service');        // Conexión con la base de datos
var Progress = require('./models/progress.model');       // Modelo del progreso
var User = require('./models/user.model');               // Modelo del usuario
var Achivement = require('./models/achivement.model');   // Modelo del logro

//-------------------------------------------------------------------------------------------
// Servicio
//-------------------------------------------------------------------------------------------

var service = {};

/**
 * Crea un nuevo modelo de progreso aasociado al usuario cuyo ID entra por parametro
 * userID ID en al base de datos del usuario al que se le va asociar el perfil de progreso
 */
service.createProgressProfile = function(userID, callback) {
    var prof = new Progress();
    prof.userID = userID;
    prof.currentRol = "Ninguno";
    prof.level = "Iniciado";
    prof.avatar = "ninguno";
    prof.videnteAsig = false;
    prof.vidente = false;
    prof.juglarAsig = false;
    prof.juglar = false;
    prof.tallerAsig = false;
    prof.taller = false;
    prof.arqueologo = false;
    prof.criticoAsig = false;
    prof.critico = false;
    prof.ensayoAsig = false;
    prof.ensayo = false;

    var db = connection.connect();
    prof.save(function(err, prof, ver){
        connection.disconnect(db);
        if(err){
            callback(1, err['errmsg'], prof);
        }
        else
            callback(0, "", prof);
    });
}

/**
 * Retorna el perfil de progreso del usuario cuyo username entra por parametro
 * user Nombre de usuario cuyo perfil de progreso se desea recuperar
 */
service.getProfile = function(user, callback) {
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err) {
            connection.disconnect(db);
            callback(1, "Error en la base de datos", null);
        }
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    connection.disconnect(db);
                    if(err)
                        callback(1, err['errmsg'], null);
                    else {
                        if(profile[0])
                            callback(0, null, profile[0])
                        else {
                            callback(1, "El usuario no se ha registrado", null);
                        }
                    }
                });
            }
            else {
                connection.disconnect(db);
                callback(1, "El usuario no existe", null);
            }
        }
    });
}

service.getFlag = function(user, flag, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err) {
            connection.disconnect(db);
            callback("Error en la base de datos", false);
        }
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    connection.disconnect(db);
                    if(err)
                        callback(err['errmsg'], false);
                    else {
                        var prof = profile[0];
                        if(prof){
                            if(prof[flag])
                                callback(null, prof[flag]);
                            else
                                callback('No existe la marca: ' + flag, false);
                        }                            
                        else {
                            callback("El usuario no se ha registrado", false);
                        }
                    }
                });
            }
            else {
                connection.disconnect(db);
                callback("El usuario no existe", false);
            }
        }
    });
}

/**
 * Retorna una lista con todos los logros del usuario cuyo username entra por parametro
 * user Nombre de usuario cuyos logros se desean recuperar
 */
service.getAchivements = function(user, callback) {
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos", []);
        }
        else {
            if(search[0]) {
                Achivement.find({userID: search[0]._id}, function(err, achivements) {
                    connection.disconnect(db);
                    if(err)
                        callback ("No fue posible recuperar todos los logros", []);
                    else {
                        callback(null, achivements);
                    }
                });
            }
            else {
                connection.disconnect(db);
                callback("El usuario solicitado no exites", []);
            }
        }
    });
}

/**
 * Asigna el achivement cuyo id entra por parametro al usuario cuyo username entra por parametro
 * user Nombre de usuario al que se le desea agregar el nuevo logro
 * achivementID ID de la base de datos del logro que se desea agregar
 */
service.addAchivement = function (user, text, points, callback) {
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos: " + err);
        }
        else {
            if(search[0]) {
                var achivement = new Achivement();
                achivement.userID = search[0]._id;
                achivement.text = text;
                achivement.points = points;
                achivement.save(function(err, object, ver){
                    connection.disconnect(db);
                    if(err)
                        callback("No fue posible guardar el logro");
                    else   
                        callback(null);
                });
            }
            else {
                connection.disconnect(db);
                callback("No fue posible encontrar al usuario solicitado");
            }
        }
    });
}

/**
 * Actualiza el rol del usuario cuyo username entra por parametro con el rol peovisto
 * user Nombre del usuario
 * role Texto del nuevo rol
 */
service.updateRole = function(user, role, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        callback("No fue posible encontrar el perfil");
                    }else{
                        profile[0].currentRol = role;
                        profile[0].save(function(err, prof, ver){
                            connection.disconnect(db);
                            if(err){
                                callback("No fue posible cambiar el rol");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
        }
    });
}

service.updateAvatar = function(user, avatar, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        connection.disconnect(db);
                        callback("No fue posible encontrar el perfil");
                    }else{
                        profile[0].avatar = avatar;
                        profile[0].save(function(err, prof, ver){
                            connection.disconnect(db);
                            if(err){
                                callback("No fue posible cambiar el avatar");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
        }
    });
}

service.updateLevel = function(user, level, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err){
            connection.disconnect(db);
            callback("Error en la base de datos");
        }
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        connection.disconnect(db);
                        callback("No fue posible encontrar el perfil");
                    }else{
                        profile[0].level = level;
                        profile[0].save(function(err, prof, ver){
                            connection.disconnect(db);
                            if(err){
                                callback("No fue posible cambiar el nivel");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
            else {
                connection.disconnect(db);
                callback("No fue posible encontrar el usuario");
            }
        }
    });
}

service.getAvatar = function(user, callback){
    var db =  connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos", null);
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    connection.disconnect(db);
                    if(err){
                        callback("No fue posible encontrar el perfil", null);
                    }else{
                        callback(null, profile[0].avatar);
                    }
                });
            }
        }
    });
}

/**
 * Activa la bandera de progreso especificadel usuario que entra por parametro
 * user Nombre de usuario que registra el progreso
 * flag Bandera especifica que se desea activar
 */
service.activateFlag = function(user, flag, callback){
    var db = connection.connect();
        User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]) {
                Progress.find({userID: search[0]._id}, function(err, profile) {
                    if(err){
                        callback("No fue posible encontrar el perfil");
                    }else{
                        var userProgress = profile[0];
                        userProgress[flag] = true;
                        userProgress.save(function(err, prof, ver){
                            connection.disconnect(db);
                            if(err){
                                callback("No fue posible actualizar el progreso");
                            }else{
                                callback(null);
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = service;