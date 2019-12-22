const mysql = require('mysql2');
const express = require('express');
const mysqlConnection = require('../db/connection');

exports.GetForGoodsList =function (quantity, result) {    
    mysqlConnection.query("select id,name,picture,  price from Model where brand = ? ", quantity, function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });           
};

exports.CartModel =function (req, result) { 
    var cart=[];
    var length = Object.keys(req.body).length;

    keys = Object.keys(req.body);
    var last =keys[length -1 ];

    console.log("lenght" + length);
        for (var i = 0; i < length ; i++) {

         console.log(keys[i]);
        mysqlConnection.query("select id, name, picture,  price from Model where id =?  ", keys[i] , function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            var c=JSON.parse(JSON.stringify(res));
            cart.push(c[0]);
            console.log(cart);
            console.log('lenght'+last);
            console.log('key'+ res[0].id);
            if( res[0].id == last ) {
            console.log("dfgh");
            console.log(cart);
            result(null,JSON.stringify(cart));
            }
            else {

            }
        }
        
    });
           
      }       
};

exports.GetForGoodsListAll =function (quantity, result) {    
    mysqlConnection.query("select id,name, picture,  price from Model ", quantity,function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });           
};

exports.CreateModel =function (req,result) {
	mysqlConnection.query("insert into Model(name,description,storke,picture,price,start,control,brand,power,volume,mass,class,accessibility) values(?,?,?,?,?,?,?,?,?,?,?,?,?);",[req.name,req.description,req.storke,req.picture,req.price,req.start,req.control,req.brand,req.power,req.volume,req.mass,1,1],function (err,res) {
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
	});
}

function Correct(array,arrayV) {
	for(i=0; i<array.length; i++) {
    	if(array[i] != undefined) {
    		for(j=0; j<array.length; j++) {
    			if(array[j]==undefined) {
    				array[j]="0";
    			}
    		}
    	}
    }
    for(i=0; i<array.length; i++) {
    	if(array[i] == undefined) {
    		for(j=0; j<array.length; j++) {
    			if(array[j]==undefined) {
    				array[j]=arrayV[j];
    			}
    		}
    	}
    }
	return array;
}
function Correctpower(array,arrayV) {
	var flag=false;
	for(i=1; i<array.length;) {
		
    	if(array[i] != undefined) {
    		array[i]=arrayV[i];
    		array[i-1]=arrayV[i-1];
    		flag=true;
    	}
    	i=i+2;
    }
    if(flag) {
    	for(j=1; j<array.length; ) {
    			if(array[j]==undefined) {
    				array[j]=300;
    			}
    			j=j+2;
    		}
    }
    for(i=1; i<array.length;) {
    	if(array[i] == undefined) {
    		for(j=1; j<array.length;) {
    			if(array[j]==undefined) {
    				array[i]=/*arrayV[i]*/300;
    		        array[i-1]=/*arrayV[i-1]*/0;
    			}
    			j=j+2;
    		}
    	}
    	i=i+2;
    }
	return array;
}
exports.GetFilterModel= function (req,result) {
	var post  = req.body;

    var storke= [post.storke2,post.storke4];
    var start= [post.start_r, post.start_e, post.start_er];
    var control= [post.control_r, post.control_d, post.control_rd];
    var power= [0,post.power_1, 0, post.power_2, 0, post.power_3, 0, post.power_4, 0, post.power_5, 0, post.power_6, 0, post.power_7];

    var storkeValue =[2, 4];
    var startValue=["r","e","er"];
    var controlValue=["r","d","rd"];
    var powerValue=[2.0, 3.5, 4.0, 7.5, 8.0, 15.0, 18.0, 25.0, 30.0, 40.0, 50.0, 70.0, 70.5, 300.0];

    var storkeCor= Correct(storke,storkeValue);
    var startCor= Correct(start,startValue);
    var controlCor= Correct(control,controlValue);
    var powerCor= Correctpower(power,powerValue);

	var sql = " select t.id AS id, t.name AS name, t.price AS price from (select m.id AS id, m.name AS name, m.price AS price , a.power AS power, a.storke AS storke, a.start AS start, a.control AS control from Model AS m JOIN Atribute AS a ON (m.atribute = a.id) ) AS t  where t.storke in ('"+storkeCor[0]+"','"+storkeCor[1]+"') and t.start in ('"+startCor[0]+"','"+startCor[1]+"','"+startCor[2]+"')  and t.control in ('"+controlCor[0]+"','"+controlCor[1]+"','"+controlCor[2]+"') and (t.power < "+powerCor[1]+" and t.power >"+powerCor[0]+")  and (t.power< "+powerCor[3]+" and t.power >"+powerCor[2]+") and (t.power<"+ powerCor[5]+" and t.power >"+powerCor[4]+") and (t.power< "+powerCor[7]+" and t.power >"+powerCor[6]+")  and (t.power< "+powerCor[9]+" and t.power >"+powerCor[8]+") and (t.power< "+powerCor[11]+" and t.power >"+powerCor[10]+") and (t.power< "+powerCor[13]+" and t.power >"+powerCor[12]+");";
	

    
    var sql2 ="select id, name, picture, price from Model where storke in ('"+storkeCor[0]+"','"+storkeCor[1]+"') and start in ('"+startCor[0]+"','"+startCor[1]+"','"+startCor[2]+"')  and control in ('"+controlCor[0]+"','"+controlCor[1]+"','"+controlCor[2]+"') and (power <= "+powerCor[1]+" and power >="+powerCor[0]+")  and (power<= "+powerCor[3]+" and power >="+powerCor[2]+") and (power<="+ powerCor[5]+" and power >="+powerCor[4]+") and ( power<= "+powerCor[7]+" and power >="+powerCor[6]+")  and ( power<= "+powerCor[9]+" and power >="+powerCor[8]+") and ( power<= "+powerCor[11]+" and power >="+powerCor[10]+") and (power<= "+powerCor[13]+" and power >="+powerCor[12]+");";
    console.log(sql2);
    mysqlConnection.query( sql2,function (err,res) {
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
	});
}