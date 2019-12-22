const mysql = require('mysql2');
const express = require('express');
const mysqlConnection = require('../db/connection');



exports.GetOrder =function (req,result) {

    mysqlConnection.query('select o1.id as o1id, o1.price as o1pice, o1.payment as o1payment, o1.comments as o1comments, o1.status as o1status, c.surname as csurname, c.phone as cphone, c.geozone as cgeozone, c.sale as csale from Order1 as o1 join Client as c on (o1.client = c.id) where o1.status = 0 ',function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
                result(null,res);
        }
    });
}

exports.GetModels =function (req,result) {
    var key= req.body;
    console.log(req.body);
    console.log(key['id']);
    mysqlConnection.query('select m.id, m.name, m.accessibility, m.price, o.quantity from Model as m join OrderModel as o on (m.id=o.model) where o.order1 = ? ', key['id'],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
        	   console.log(res);
               result(null,JSON.stringify(res));
        }
    });
}

exports.Done =function (req,result) {
    var key= req.body;
    mysqlConnection.query('update Order1 as o set o.status= 1 where o.id = ?  ',key['id'],function (err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
                result(null,res);
        }
    });
}