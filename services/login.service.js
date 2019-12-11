/**
 * Servicio para manejar el regtistro y login de usarios
 */

 //---------------------------------------------------------------------------------------------------
 // Requerimientos
 //---------------------------------------------------------------------------------------------------

var connection = require('./connection.service');       // Servicio de conexión con Mongo
var bcrypt = require('bcrypt');                         // Libreria de encriptamiento
var User = require('./models/user.model');              // Modelo del usuario
var Progress = require('./models/progress.model');      // Modelo del usuario
var ProgressService = require('./progress.service');    // Servicio del progreso

//-----------------------------------------------------------------------------------------------------
// Servicio
//-----------------------------------------------------------------------------------------------------

var service = {};

/**
 * Registra un nuevo usuario en la base de datos con su progreso respectivo si no es un admin
 * username Nombre unico del usuario
 * password Clave en texto plano del nuevo usuario
 * shownName Nombre del usuario que se muestra en la aplicación
 */
service.register = function(username, password, shownName, admin, callback){
    var db = connection.connect();
    var user = new User();
    bcrypt.hash(password, 10, function(err, hash) {
        user.username = username;
        user.password = hash;
        user.shownName = shownName;
        user.admin = admin;
        user.asign = false;
        user.avatar = 'none';

        user.save(function(err, user, ver){
            if(err){
                connection.disconnect(db);
                callback(1, err['errmsg'], user);
            }
            else{
                if(!admin) {
                    ProgressService.createProgressProfile(user._id, function(status, err, prof){
                        connection.disconnect(db);
                        if(status > 0)
                            callback(1, err, user);
                        else
                            callback(0, null, user);
                    });
                }
                else {
                    callback(0, null, user);
                }
            }
        });
    });
}

/**
 * Verifica que el usuario con el user y password provistos esta registrado y retorna un objeto con todos sus datos solo si
 * los permisos de admin provistos coinciden con los guardados en BD
 * user Nombre de usuario a revisar
 * password Clave asiciada al usuario a revisar
 * admin Si tiene o no permisos de admin
 */
service.login = function(user, password, admin, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        connection.disconnect(db);
        if(search[0]){
            bcrypt.compare(password, search[0].password, function(err, res) {
                if(res) {
                    var user = search[0];
                    if(admin == user.admin)
                        callback(null, true, user);
                    else
                        callback("Permiso incorrecto", false, null);      
                }    
                else
                    callback("Login incorrecto", false, null);
            });
        }
        else{
            callback("El usuario no existe", false, null);
        }
    });  
}

/**
 * Retorna una lista de todos los participantes registrados en la base de datos
 */
service.getParticipants = function(callback){
    var db = connection.connect();
    User.find({admin: false}, function(err, search){
        connection.disconnect(db);
        callback(err, search);
    });
}

service.getUnasigned = function(callback){
    var db = connection.connect();
    User.find({admin: false, asign: false}, function(err, search){
        connection.disconnect(db);
        callback(err, search);
    });
}

service.unregister = function(user, callback) {
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback(err);
        else {
            if(search[0]) {
                isDeleteable(search[0]._id, function(deleteable){
                    if(deleteable) {
                        User.findOneAndRemove({_id: search[0]._id}, (err) => {
                            if(err)
                                callback(err);
                            else {
                                Progress.findOneAndRemove({userID: search[0]._id}, (err) => {
                                    connection.disconnect(db);
                                    if(err)
                                        callback(err);
                                    else
                                        callback(null);
                                });
                            }
                        });
                    }
                    else{
                        callback("El usuario no puede ser borrado: Ya hay progreso registrado");
                    }
                });
            }
        }
    });
}

service.changePassword = function(user, password, callback){
    var db = connection.connect();
    User.find({username: user}, function(err, search){
        if(err)
            callback("Error en la base de datos");
        else {
            if(search[0]){
                bcrypt.hash(password, 10, function(err, hash) {
                    search[0].password = hash;
                    search[0].save(function(err, user, ver){
                        connection.disconnect(db);
                        if(err)
                            callback("No fue posible actualizar la contraseña");
                        else
                            callback(null);
                    });
                });
            }
            else
                callback("El usuario no existe");
        }
    });
}

/**
 * Determina si el usuario que entra por parametro puede borrarse pues no tiene ningun progreso
 * @param user Nombre de usuario que se desea verificar
 */
function isDeleteable(id, callback) {
    var db = connection.connect();
    Progress.find({userID: id}, function(err, progress){
        connection.disconnect(db);
        if(progress[0])
            callback(progress[0].currentRol == 'Ninguno'); 
        else
            callback(false);
    });
}

module.exports = service;