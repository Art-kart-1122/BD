const express = require('express');
const Router = express.Router();
const user = require('../controlers/user');



function checkSignIn(req, res, next){
   if(req.session.userlogin =='BanditBandit'){
      console.log(req.session.userlogin);
      console.log("yes");
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.userlogin);
      res.render('auth');
   }
}
Router.get('/login', checkSignIn, user.login);
//Router.get('/login', function(req,res,next){ user.login});
Router.post('/login', user.login);//call for login page
//Router.get('/signup', user.signup);//call for signup page

module.exports = Router;