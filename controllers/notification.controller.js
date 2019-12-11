/**
 * Controlador para manejar los servicios asociados con las notificaciones de los usuarios
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/notification.service');     // Servicios asociados al manejo de notificaciones

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.addNotification = function(user, mensaje, callback) {
    service.addNotification(user, mensaje, function(err){
        callback(err);
    });
}

controller.getNotifications = function(username, callback) {
    service.getNotifications(username, function(err, list){
        callback(err, list);
    });
}

controller.whipeNotifications = function(username, callback){
    service.whipeNotifications(username, function(err){
        callback(err);
    });
}

module.exports = controller;