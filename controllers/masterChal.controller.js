/**
 * Controlador para manejar los servicios asociados con los retos hechos por un master
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/masterChal.service');     // Servicios asociados al manejo de retos

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.createChallenge = function(master, type, text, callback) {
    service.createChallenge(master, type, text, function(err){
        callback(err);
    });
}

controller.getChallenges = function(type, callback){
    service.getChallenges( type, function(err, list){
        callback(err, list);
    });
}

module.exports = controller;