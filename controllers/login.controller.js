//---------------------------------------------------------------------------------------------
// Requerimientos
//---------------------------------------------------------------------------------------------

var service = require('../services/login.service');

//---------------------------------------------------------------------------------------------
// Atributos
//---------------------------------------------------------------------------------------------

var controller = {};

//---------------------------------------------------------------------------------------------
// Funciones
//---------------------------------------------------------------------------------------------

controller.register = function(req, callback){
    service.register(req.body.user, req.body.password, req.body.shownName, req.body.admin, function(stat, msn, user){
        callback(stat, msn, user);
    });
}

controller.unregister = function(req, callback){
    service.unregister(req.body.user, function(err){
        callback(err);
    });
}
controller.login = function(req, callback){
    service.login(req.body.user, req.body.password, req.body.admin, function(err, isMatch, user){
        callback(err, isMatch, user);
    });
}

controller.getParticipants = function(callback){
    service.getParticipants(function(err, participants){
        callback(err, participants);
    });
}

controller.getUnasigned = function(callback){
    service.getUnasigned(function(err, participants){
        callback(err, participants);
    });
}

controller.changePassword = function(user, password, callback){
    service.changePassword(user, password, function(err){
        callback(err);
    });
}

module.exports = controller;