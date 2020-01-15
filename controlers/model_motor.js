var model_motor = require('../model/model_motor');

exports.ContrGetForGoodsList = function(req, res) {
  model_motor.GetForGoodsList(req.params.limit, function(err, docs) {

    console.log(req.params.limit);
    if(err) {
    	console.log(err);
    }
    else {
      console.log('res', docs);
      res.render('index',{
      	list: docs
      });
    }
  });
}

exports.ContrGetForGoodsListAll = function(req, res) {
  model_motor.GetForGoodsListAll(req, function(err, docs) {

    //console.log(req.params.limit);
    if(err) {
    	console.log(err);
    }
    else {
      console.log('res', docs);
      res.render('index',{
      	list: docs
      });
    }
  });
}

exports.ContrCreateModel= function(req,res) {
	model_motor.CreateModel(req.body,function(err,response)
	{
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
	});
}

exports.ContrFilterModel = function(req,res) {
	model_motor.GetFilterModel(req,function(err,response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
			console.log('res', response);
            res.render('index',{
      	    list: response
            });
		}
	});
}

exports.ContrGetCountModel = function(res) {
  model_motor.GetCountModel(function(err,response) {
    if(err) {
      console.log(err);
    }
    else {
      responce.send(JSON.stringify(response));
    }
  });
}
