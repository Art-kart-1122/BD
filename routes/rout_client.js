const express = require('express');
const Router = express.Router();
const client = require('../controlers/client');


Router.post('/new', client.ContrClientNew);
Router.post('/getId',client.ContrGetClientId);


module.exports = Router;
