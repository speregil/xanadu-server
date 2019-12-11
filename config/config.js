/**
 * manija la configuración del ambiente de despliegue del servidor
 */

//--------------------------------------------------------------------------------
// Requerimientos
//--------------------------------------------------------------------------------

const _ = require('lodash');  // Lodash para el manejo de los datos

//--------------------------------------------------------------------------------
// Variables
//--------------------------------------------------------------------------------

const config = require('./config.json');                     // Archivo de configuración
const defaultConfig = config.development;                       // Configuración por defecto. Desarrollo por defecto
const environment = process.env.NODE_ENV || 'development';      // Configuración del ambiente de despliegue
const environmentConfig = config[environment];                  // Configuración actual del ambiente
const finalConfig = _.merge(defaultConfig, environmentConfig);  // Unión de la configuración actual y la defecto

global.gConfig = finalConfig;                                   // Variable global para la xonfiguración final resultante
