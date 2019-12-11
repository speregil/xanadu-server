/**
 * Controlador para manejar los servicios asociados con el progreso del usuario
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/progress.service');     // Servicios asociados al manejo del progreso
var User = require('../services/models/user.model');       // Modelo en BD del usuario

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

/**
 * Controla el servicio para reccuperar la infromación de progreso del usuario que entra por
 * parametro
 */
controller.getProgress = function(user, callback) {
    service.getProfile(user, function(status, error, prog) {
        if(status > 0)
            callback(1, "No fue posible recuperar el perfil: " + error, null );
        else {
            callback(0, null, prog);
        }
    });
}

/**
 * Controla la asignación del logro al usuario que entran por parámetro
 */
controller.addAchivement = function(user, text, points, callback) {
    service.addAchivement(user, text, points, function (err){
        callback(err);
    });
}

/**
 * Controla el servicio para recuperar los logros obtenidos por el usuario que entra por parámetros
 */
controller.getAchivements = function(user, callback) {
    service.getAchivements (user, function (err, achivements){
        callback(err, achivements);
    });
}

/**
 * Controla el servicio para recuperar la lista de todos los logros registrados en BD
 */
controller.getAchivementList = function(callback) {
    service.getAchivementList(function (err, achivements){
        callback(err, achivements);
    });
}

/**
 * Controla el servicio para actualizar el rol del usuario que entra por parámetro
 */
controller.updateRole = function(user, role, callback) {
    service.updateRole(user, role, function(err){
        callback(err);
    });
}

controller.updateAvatar = function(user, avatar, callback){
    service.updateAvatar(user, avatar, function(err){
        callback(err);
    });
}

controller.updateLevel = function(user, level, callback){
    service.updateLevel(user, level, function(error){
        callback(error);
    });
}

controller.getAvatar = function(user, callback){
    service.getAvatar(user, function(err, avatar){
        callback(err, avatar);
    });
}

/**
 * Controla el servicio para activar las banderas de progreso de un usuario
 */
controller.activateFlag = function(user, flag, callback) {
    service.activateFlag(user, flag, function(err){
        callback(err);
    });
}

controller.getFlag = function(user, flag, callback){
    service.getFlag(user, flag, function(err, state){
        callback(err, state);
    });
}

module.exports = controller;