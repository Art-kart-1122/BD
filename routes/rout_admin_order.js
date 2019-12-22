const express = require('express');
const Router = express.Router();
const order = require('../controlers/admin_order');


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

Router.get('/orders', checkSignIn,order.ContrGetOrder);
Router.post('/orders/models',checkSignIn, order.ContrGetModels);
Router.post('/orders/done',checkSignIn,order.ContrDone);


module.exports= Router;