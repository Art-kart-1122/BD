const mysql = require('mysql');
const express = require('express');
const mysqlConnection = require('../db/connection');

/*
exports.CreateClient =function (req,result) {
	mysqlConnection.query("insert into Model(name,description,accessibility,price,brand,atribute,class) values('def',?,1,3400,1,1,1);",req.picture,function (err,res) {
		if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
	});
}
*/
exports.GetClientbyLogin = function(req, result) {
    var post = req.body;
    var name = post.login;
    console.log(name);
    var pass = post.password;
    console.log(pass);
    var sql = "SELECT `login`, `surname` FROM `Client` WHERE `login`='" + name + "' and password = '" + pass + "'";
    mysqlConnection.query(sql, function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};


exports.ClientNew = function(req, result) {
    var keys = req.body;
    console.log(keys.surname, keys.email, keys.phone, keys.geozone, keys.sale, keys.price);
    mysqlConnection.query("call UPDATE_Client(?,?,?,?,?,?)", 
        [keys.surname, keys.email, keys.phone, keys.geozone, keys.sale, keys.price], 
        function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {

            result(null, JSON.stringify(res));
            console.log(res);
        }
    });
}

exports.GetClientId = function(req, result) {
    var keys = req.body;
    console.log(req.body);
    console.log(keys.surname, keys.email, keys.phone, keys.geozone, keys.sale);
    mysqlConnection.query('select id from Client where surname= ? and login= ? and phone= ? and geozone= ? and sale= ? ', 
        [keys.surname, keys.email, keys.phone, keys.geozone, keys.sale], 
        function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, JSON.stringify(res));
        }
    });
};