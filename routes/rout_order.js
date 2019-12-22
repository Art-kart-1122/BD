const express = require('express');
const Router = express.Router();
const order = require('../controlers/order');

Router.post('/fullOrder', order.ContrfullOrder);
Router.post('/OrderModel', order.ContrOrderModel);

module.exports= Router;