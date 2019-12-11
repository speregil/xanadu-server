/**
 * Enrutador para el API asociado con los grupos de participantes
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                   // Libreria base del Express
 var controller = require('../controllers/group.controller');        // Controlador del API
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 /**
  * Crea un nuevo grupo asociado a un master
  * params: nombre del grupo, master. Encriptados en el cuerpo
  */
 router.post('/new', function(req, res, next) {
     controller.createGroup(req.body.group, req.body.master, function(err, resp){
        res.json({mensaje : err, group : resp});
     });
 });

 /**
  * Elimina un grupo asociado a un master
  * params: nombre del grupo, master. Encriptados en el cuerpo
  */
 router.post('/remove', function(req, res, next) {
   controller.removeGroup(req.body.group, req.body.master, function(err, resp){
      res.json({mensaje : err});
   });
});

/**
  * Asigna un participante a un grupo
  * params: nombre del grupo, nombre de usuario. Encriptados en el cuerpo
  */
 router.post('/asign', function(req, res, next) {
    controller.asign(req.body.groupName, req.body.userName, function(err){
       res.json({mensaje : err});
    });
});

/**
 * Retira un participante de un grupo
 * params: nombre del grupo, nombre de usuario. Encriptados en el cuerpo
 */
router.post('/unasign', function(req, res, next) {
   controller.unasign(req.body.groupName, req.body.userName, function(err){
      res.json({mensaje : err});
   });
});

/**
  * Retorna la lista de grupos del master que entra por parámetro
  */
router.get('/list/:mastername', function(req, res, next) {
   controller.getGroups(req.params.mastername, function(err, groups){
      res.json({mensaje : err, list: groups});
   });
});

/**
 * Retorna la lista de participantes del grupo que entra por parametro
 */
router.get('/participants/:groupname', function(req, res, next) {
   controller.getParticipants(req.params.groupname, function(err, participants){
      res.json({mensaje : err, list: participants});
   });
});

 module.exports = router;