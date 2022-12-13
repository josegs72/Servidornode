const express = require('express');
const router = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinema.routes.js');
const connect = require('./utils/db.js');
const cors = require('cors');
const createError = require('./utils/errors/create-error.js');
const passport = require('passport');
const userRouter = require('./routes/user.routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');



const DB_URL = "mongodb+srv://root:1Lor8wFgXCUbCJlF@cluster0.1vr8feq.mongodb.net/?retryWrites=true&w=majority";


connect();


const PORT = 3000;
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use(express.static(path.join(__dirname,'public')));


require('./utils/authentication/passport.js');
server.use(session({
  secret: 'hola_mundo',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 120000
  },
  store : MongoStore.create({
    mongoUrl: DB_URL,
  })
 })); 


server.use(passport.initialize());
server.use(passport.session());

server.use('/user',userRouter);
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