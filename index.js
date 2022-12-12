const express = require('express');
const router = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinema.routes.js');
const connect = require('./utils/db.js');
const cors = require('cors');
const createError = require('./utils/errors/create-error.js');


connect();


const PORT = 3000;
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use('/movies',router);
server.use('/cinemas', cinemasRouter);

server.use('*',(req,res,next) => {
 next(createError('Not found',404));
});

server.use((err,req,res,next) => {
  const status = err.status || 500;
  const message = err.message || 'Error';
  res.status(status).json({status,message});
  });

   

server.listen(PORT,() =>{
  console.log(`Servidor escuchando en el puerto ${PORT}`);  
  console.log(`Server running in http://localhost:${PORT}`);
});