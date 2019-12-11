/**
 * Enrutador para el API asociado con los retos de participantes
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                   // Libreria base del Express
 var controller = require('../controllers/challenge.controller');    // Controlador del API
 var master = require('../controllers/masterChal.controller');       // Controlador del API del Master
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 /**
  * Operacion para agregar un nuevo reto a un usuario
  * params: usuario, tipo del reto, texto del reto. Encriptados en el juego
  */
 router.post('/add', function(req, res, next) {
     controller.addChallenge(req.body.user, req.body.type, req.body.text, function(err){
        res.json({mensaje : err });
     });
 });

 /**
  * Operacion para agregar un nuevo reto a la lista de juegos creados por los master
  * params: master, tipo del reto, texto del reto. Encriptados en el juego
  */
 router.post('/create', function(req, res, next) {
    master.createChallenge(req.body.master, req.body.type, req.body.text, function(err){
       res.json({mensaje : err });
    });
});

/**
  * Operacion para calificar un reto específico asociado a un usuario
  * params: id del reto, puntos. Encriptados en el juego
  */
router.post('/grade', function(req, res, next){
    controller.gradeChallenge(req.body.id, req.body.points, function(err){
        res.json({mensaje : err});
    });
});

/**
 * Retorna la lista de retos asociados al usuario que entra por parametro
 */
router.get('/list/:user', function(req, res, next) {
    controller.getChallenges(req.params.user, function(err, challenges){
        res.json({mensaje : err, list : challenges});
    });
});

/**
 * Retorna una lista de todos los retos del master del tipo que entra por parámetro
 */
router.get('/master/list/:type', function(req, res, next) {
    master.getChallenges(req.params.type, function(err, challenges){
        res.json({mensaje : err, list : challenges});
    });
});

 module.exports = router;