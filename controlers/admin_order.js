var order = require('../model/admin_order');



exports.ContrGetOrder  = function(req,responce) {
         

  order.GetOrder(req,function(err,docs) {
    if(err) {
      console.log(err);
    }
    else {
      responce.render('admin_order',{
        list : docs
      });
      console.log(docs);
    }
  });   
}

exports.ContrGetModels  = function(req,responce) {
         

  order.GetModels(req,function(err,docs) {
    if(err) {
      console.log(err);
    }
    else {
      /*responce.render('',{

      });*/
      responce.send(JSON.stringify(docs));
      console.log(docs);
    }
  });   
}

exports.ContrDone  = function(req,responce) {
         

  order.Done(req,function(err,docs) {
    if(err) {
      console.log(err);
    }
    else {
      console.log(docs);
    }
  });   
}