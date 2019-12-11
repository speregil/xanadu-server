/**
 * Modelo del registro de progreso de un Usuario
 */

//--------------------------------------------------------------------------------------------------------------
// Requerimientos
//--------------------------------------------------------------------------------------------------------------

var mongoose = require('mongoose');

//--------------------------------------------------------------------------------------------------------------
// Esquema
//--------------------------------------------------------------------------------------------------------------

var Schema = mongoose.Schema;                      

var ProgressSchema = new Schema({
    userID: {type: String, required: true, unique: true},               // Usuario al que esta asociado el registro del progreso
    currentRol: { type: String, required: true },                       // Rol actual del usuario
    level: { type: String, required: true },                            // Nivel actual del usuario
    avatar: {type: String, required: true},                             // Identificador del avatar actual de usuario tipo genero-rol
    // Progress Flags
    videnteAsig:Boolean,                                                // Si ya acepto el reto del Oraculo
    vidente:Boolean,                                                    // Si ya se le califico el reto del oraculo
    juglarAsig:Boolean,                                                 // Si ya acepto el reto del juglar
    juglar:Boolean,                                                     // Si ya se le califico el reto del juglar
    tallerAsig:Boolean,                                                 // SI ya acepto el reto del taller
    taller:Boolean,                                                     // SI ya se le califico el reto del taller
    arqueologo:Boolean,                                                 // Si ya se completo el reto del laboratorio
    criticoAsig:Boolean,                                                // Si ya acepto el reto del critico
    critico:Boolean,                                                    // SI ya se le califico el reto del critico
    periodistaAsig:Boolean,                                             // SI ya acepto el reto del periodista
    periodista:Boolean,                                                 // Si ya se le califico el reto del periodista
});

module.exports = mongoose.model('Progress', ProgressSchema);