const express = require('express');
const Router = express.Router();
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const multer = require('multer');

var List = require('../../controlers/model_motor');

const storage = multer.diskStorage({
      destination: './public/uploads/',
      filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
const upload = multer({ storage: storage }).single('picture');

app.use(bodyParser.urlencoded({extended: true}));


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


Router.get('/add/model',checkSignIn,(req,res)=> res.render('admin_add_model'));
Router.post('/add/',checkSignIn,(req,res)=> {
	console.log(req.body);
	List.ContrCreateModel(req);
	  
    });

Router.get('/add/model/picture',(req,res)=> res.render('admin_add_model_picture')) 
Router.post('/add/model/picture', function (req, res) {
       upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
           console.log(err);
        } else {
          //console.log("undefined error");
          //console.log(err);
        }
       //console.log(req.file.filename);
       res.render('admin_add_model', {    //form add model
        file: `/uploads/${req.file.filename}`}
        );
      });
   });


module.exports = Router;