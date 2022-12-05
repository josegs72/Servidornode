const express = require('express');
const router = require('./routes/movies.routes.js');
const connect = require('./utils/db.js');

connect();

const PORT = 3000;
const server = express();

server.use('/movies',router);




server.listen(PORT,() =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);  
  console.log(`Server running in http://localhost:${PORT}`);
});