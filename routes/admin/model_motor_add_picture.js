
const express = require('express');
const Router = express.Router();
   const multer = require('multer');
   const path = require('path');


   const storage = multer.diskStorage({
      destination: './public/uploads/',
      filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });

  const upload = multer({ storage: storage }).single('picture');

     console.log('g');
     Router.get('/c',(req,res)=> res.render('admin_add_model_picture')) // form add picture
     Router.post('/', function (req, res) {
	     console.log(req.body.picture);
       upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
           console.log(err);
        } else {
          console.log("undefined error");
          console.log(err);
        }
       console.log(req.file.filename);
       res.render('admin_add_model', {    //form add model
        file: `/uploads/${req.file.filename}`}
        );
      });
   });

module.exports = Router;