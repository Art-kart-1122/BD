const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const Router =express.Router();
const path = require('path');
const catalog = require('./routes/rout_model_motor'); 
const Admin = require('./routes/admin/model_motor_add');
const Auth = require('./routes/rout_auth');
const Cart = require('./routes/rout_cart');
const client = require('./routes/rout_client');
const order = require('./routes/rout_order.js');
const testadmin = require('./routes/rout_admin_order.js');


var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}));

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


   


app.use('/cart', Cart);
app.use('/admin',Admin);
app.use('/auth',Auth);
app.use('/catalog',catalog);
app.use('/client',client);
app.use('/order',order);
app.use('/test',testadmin);





// 404
app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

// 500 - Any server error
app.use(function(err, req, res, next) {
  return res.status(500).send({ error: err });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));