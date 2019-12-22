const express = require('express');
const Router = express.Router();
const Model = require('../controlers/cart');

Router.post('/', Model.ContrGetCartModel);
Router.get('/orders', Model.ContrCart);
Router.get('/execution', Model.ContrOrder);

module.exports= Router;