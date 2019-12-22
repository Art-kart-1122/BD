var order = require('../model/order');

exports.ContrfullOrder  = function(req,responce) {
	       

	order.fullOrder(req,function(err,docs) {
    if(err) {
      console.log(err);
    }
    else {
      responce.send(JSON.stringify(docs));
    }
  });		
}

exports.ContrOrderModel  = function(req,responce) {
         

  order.OrderModel(req,function(err,docs) {
    if(err) {
      console.log(err);
    }
    else {
      responce.send('ok is full');
    }
  });   
}