const mysql = require('mysql2');
const express = require('express');
const mysqlConnection = require('../db/connection');

exports.fullOrder =function (req,result) {
    var keys = req.body;
    var id_order;
    console.log(keys.id, keys.price,'Mastercard','quickly',0,1);
    mysqlConnection.query("insert into Order1(client,price ,payment,comments,status,shipping) values(?,?,?,?,?,?);",[keys.id,keys.price,'Mastercard','quickly',0,1],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
        	/*mysqlConnection.query("select id  from Order1 where client= ? and price= ? and payment= ? and comments = ? and status= ? and shipping= ?",[keys.id, keys.price,'Mastercard','quickly',0,1],function (err,res) {
               if(err) {
                  console.log("error: ", err);
                result(err, null);
                } 
                 else {
                 	 console.log("---------id order"+res);
                     id_order=res;
                 }
        	});
        */}
    });
    console.log(keys.id, keys.price,'Mastercard','quickly',0,1);
    mysqlConnection.query("select id, client from Order1 where client= ? and price= ? and payment= ? and comments = ? and status= ? and shipping= ?",[keys.id, keys.price,'Mastercard','quickly',0,1],function (err,res) {
               if(err) {
                  console.log("error: ", err);
                result(err, null);
                } 
                 else {
                 	 console.log(res);
                 	 var length =res.length;
                     id_order=res[length-1];
                     console.log('id order'+id_order);
                     result(null, JSON.stringify(id_order));
                 }
        	});
    /*delete keys['id'];
    delete keys['price'];
    var lengthKeys = Object.keys(keys).length;
    keysId = Object.keys(keys);
    for (var i = 0; i < lengthKeys ; i++) {
    	console.log(id_order,keysId[i],keys[i]);
        mysqlConnection.query("insert into OrderModel(order1, model, quantity) values(?,?,?);",[id_order,keysId[i],keys[i]],function (err,res) {
           if(err) {
              console.log("error: ", err);
              result(err, null);
            }  
        });
    } */
    //result(null,'ok');
    
}

exports.OrderModel =function (req,result) {
    var keys = req.body;
    var id_order = keys['id'];
    delete keys['id'];
	var lengthKeys = Object.keys(keys).length;
	var newKey = keys;
    keysId = Object.keys(keys);
    var j=0;
    for (var i in keys) {
    	console.log(id_order,keysId[j],newKey[i]);
        mysqlConnection.query("insert into OrderModel(order1, model, quantity) values(?,?,?);",[id_order,keysId[j], newKey[i]],function (err,res) {
           if(err) {
              console.log("error: ", err);
              result(err, null);
            }
            else {
            	result(null,'ok');
            }
        });
        j++;
    } 
}

	