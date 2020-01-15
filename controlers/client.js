var client = require('../model/client');

exports.ContrClientNew = function(req,responce) {
	    
		
		    client.ClientNew(req,function(err,docs) {
          if(err) {
    	  console.log(err);
           }
           else {
           responce.send(JSON.stringify(docs));
           console.log(JSON.stringify(docs));
           }
		});
			
}


exports.ContrGetClientId = function(req,responce) {
      
    
        client.GetClientId(req,function(err,docs) {
          if(err) {
        console.log(err);
           }
           else {
           
            responce.send(JSON.stringify(docs));
           }
    });
      
}