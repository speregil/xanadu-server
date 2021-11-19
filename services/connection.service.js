/**
 * Servicio para la conexión con MongoDB usando la libreria Mongoose
 */

 //------------------------------------------------------------------------------------------
 // Requerimientos
 //------------------------------------------------------------------------------------------

var mongoose = require('mongoose');   // Libreria Mongoose

//-------------------------------------------------------------------------------------------
// Servicio
//-------------------------------------------------------------------------------------------

var service = {};

/**
 * Conecta a una base MongoDB haciendo uso de Mongoose
*/
service.init = function(){
    var dbHost = gConfig.database;
    var options = { connectTimeoutMS : gConfig.dbTimeout, poolSize: gConfig.dbPoolSize, useNewUrlParser: true, useUnifiedTopology: true};
    mongoose.connect(dbHost, options);

    mongoose.connection.on('connected', function () {  
        gLog.info("Conexión exitosa a: ", dbHost); 
    }); 

    mongoose.connection.on('error',function (err){  
        gLog.error("Error con la conexión a la base de datos: ", err); 
    });
    
    process.on('SIGINT', function() {
        gLog.info("Servidor abajo. Conexión a la base de datos terminada");  
        mongoose.connection.close(function () { 
            process.exit(0); 
        }); 
    });
}

/**
 * Elimina la conexión actual de mongoose
 */
service.disconnect = function( msn ){
    mongoose.connection.close(function () {
        gLog.info("Un proceso cerró la conexión a la base de datos: ", msn);
    }); 
}

module.exports = service;