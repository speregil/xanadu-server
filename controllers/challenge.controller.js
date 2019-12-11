/**
 * Controlador para manejar los servicios asociados con los retos de participantes
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/challenge.service');     // Servicios asociados al manejo de retos

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.addChallenge = function(user, type, text, callback) {
    service.addChallenge(user, type, text, function(err){
        callback(err);
    });
}

controller.getChallenges = function(user, callback){
    service.getChallenges(user, function(err, list){
        callback(err, list)
    });
}

controller.gradeChallenge = function(id, points, callback) {
    service.gradeChallange(id, points, function(err){
        callback(err);
    });
}

module.exports = controller;