/**
 * Controlador para manejar los servicios asociados con los grupos de participantes
 */

//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/group.service');     // Servicios asociados al manejo de grupos

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};    // Modulo del controlador a exportar

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.createGroup = function(groupName, masterName, callback) {
    service.createGroup(groupName, masterName, function(err, group){
        callback(err, group);
    });
}

controller.removeGroup = function(groupName, masterName, callback) {
    service.removeGroup(groupName, masterName, function(err){
        callback(err);
    });
}

controller.getGroups = function(masterName, callback) {
    service.getGroups(masterName, function(err, groups){
        callback(err, groups);
    });
}

controller.getParticipants = function(groupName, callback) {
    service.getParticipants(groupName, function(err, participants){
        callback(err, participants);
    });
}

controller.asign = function(groupName, masterName, callback) {
    service.asign(groupName, masterName, function(err){
        callback(err);
    });
}

controller.unasign = function(groupName, userName, callback) {
    service.unasign(groupName, userName, function(err){
        callback(err);
    });
}

module.exports = controller;