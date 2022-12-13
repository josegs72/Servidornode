require('dotenv').config();

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
const cloudinary = require('cloudinary');




const DB_URL = process.env.DB_URL;

connect();


const PORT = process.env.PORT || 3000;
const server = express();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY , 
  api_secret: process.env.CLOUD_SECRET,
});


server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended:false}));

server.use(express.static(path.join(__dirname,'public')));


require('./utils/authentication/passport.js');
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 120000 
  },
  store: MongoStore.create({
      mongoUrl: DB_URL
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

