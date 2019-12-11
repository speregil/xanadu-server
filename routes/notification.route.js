/**
 * Enrutador para el API asociado con las notificaciones
 */

 //-------------------------------------------------------------------------------------
 // Requerimientos
 //-------------------------------------------------------------------------------------

 var express = require('express');                                          // Libreria base del Express
 var controller = require('../controllers/notification.controller');        // Controlador del API
 
 //--------------------------------------------------------------------------------------
 // Enrutamientos
 //--------------------------------------------------------------------------------------
 
 var router = express.Router();
 
 /**
  * Crea una nueva notificación en la lista de un usuario
  * params: nombre del usuario, mensaje de la notificación. Encriptados en el cuerpo
  */
 router.post('/new', function(req, res, next) {
     controller.addNotification(req.body.username, req.body.mensaje, function(err){
        res.json({mensaje : err});
     });
 });

 /**
  * Elimina todas las notificacionesde de un usuario
  * params: nombre del usuario. Encriptados en el cuerpo
  */
 router.post('/whipe', function(req, res, next) {
    controller.whipeNotifications(req.body.username, function(err){
       res.json({mensaje : err});
    });
});

/**
 * Retorna la lista de notificaciones del usuario que entra por parametro
 */
 router.get('/list/:username', function(req, res, next){
    controller.getNotifications(req.params.username, function(err, notifications){
        res.json({mensaje: err, list: notifications});
    });
 });

 module.exports = router;