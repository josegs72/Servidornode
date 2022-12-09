const express = require('express');
const router = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinema.routes.js');
const connect = require('./utils/db.js');
const cors = require('cors');
connect();


const PORT = 3000;
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use('/movies',router);
server.use('/cinemas', cinemasRouter);

server.use('*', (req, res, next) => {
  next(createError('Esta ruta no existe', 404));
});

server.use((err,req,res,next) => {
  return res.status(err.status || 500).json( err.message || 'Unexpected error');
});
   

server.listen(PORT,() =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);  
  console.log(`Server running in http://localhost:${PORT}`);
});