# Xanadu - Servidor

  <p>Servidor de funciones y datos para el portal Xanadu. El servidor se encarga de conectarce a la base de datos y trasmitir los datos al cliente
  o al master segun corresponda.</p>

<h1>Requisitos</h1>
  <ul>
    <li>Node.js: Construido usando v10.15. Debe ser posible usarse con versiones mas nuevas, siempre y cuando se haga la instalación y
    actualización manual de todas las dependencias de npm</li>
    <li>MongoDB: No hay una dependencia de versión fija, pues la conexión se hace a través de la libraria mongoose</li>
  </ul>

<h1>Configuración</h1>
  <p>En la carpeta config/config.json se stablecen los parametros para la conexión con la base de datos y el despliegue en Node.js del servidor. Los
  parametros más importantes son:</p>
  <ul>
    <li>node_port: Puerto donde el servidor estará escuchando. Default = 3131</li>
    <li>database: Locación de la base de datos MongoDB. No es necesario que la base de datos tenga una configuración base. En la primera ejecución el
    servidor se encarga de crear los elementos necesarios. Por defecto el servidor busca la base de datos en mongodb://localhost/ esto es, la instalación
    por defecto de mongo en el localhost. Por defecto se busca una base de datos llamada interficiesDB. La locación y el nombre de la base de datos puede
    cambiar sin problemas si se cambia el parametro en el archivo</li>
  </ul>
  
 <h1>Inicialización</h1>
 <ol>
  <li>Copiar la carpeta completa del proyecto en el directorio seleccionado</li>
  <li>Cambiar los parámetros del servidor en la carpeta config/config.json</li>
  <li>Correr el archivo server.js usando Node.js</li>
  <li>El servidor indicará en consola la conexión exitosa a la base de datos y el puerto en donde estará escuchando</li>
 </ol>
 
