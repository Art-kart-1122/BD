var model_motor = require('../model/model_motor');

function storage(v) {
	cart=[];
	cart.push(v);

}

exports.ContrGetCartModel = function(req,responce) {
	    
		
		model_motor.CartModel(req,function(err,docs) {
          if(err) {
    	  console.log(err);
           }
           else {
           
            //console.log(docs);
           	responce.send(JSON.stringify(docs));
           }
		});
			
}


exports.ContrCart =function(req,res) {
	res.render('cart');
}

exports.ContrOrder =function(req,res) {
	res.render('order');
}

