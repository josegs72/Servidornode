const express = require("express");
const passport = require("passport");
const userRouter = express.Router();

// Rutas de /api/users //
// Ruta de crear /api/users //

userRouter.post("/register", (req, res, next) => {
  const done = (err, user) => {
    if (err) {
      return next(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json(user);
    }
    );
  };
  passport.authenticate("register", done)(req);
});

// Ruta de coger users con passport y logearse//
userRouter.post("/login", (req, res, next) => {
    const done = (err, user) => {
      if (err) {
        return next(err);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      }
      );
    };
    passport.authenticate("login", done)(req);
  });
 // Ruta de coger users con passport  y deslogearse//
  userRouter.post('/logout',(req,res,next) => {
    if(req.user) {
     
        req.logOut(() =>{
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.status(200).json('Usuario deslogueado');
      });
    });
    } else {
        return res.status(304).json('Usuario no logueado en este momento');
    }
    });
//modulo exportado//

module.exports = userRouter;
