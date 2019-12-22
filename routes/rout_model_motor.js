const express = require('express');
const Router = express.Router();
const List = require('../controlers/model_motor');

Router.get('/:limit', List.ContrGetForGoodsList);
Router.get('/',List.ContrGetForGoodsListAll);
Router.post('/filter',List.ContrFilterModel);

module.exports= Router;
/*
module.exports = function(app) {
  var List = require('../controlers/model_motor');
  app.route('/catalog/:limit')
  .get( List.ContrGetForGoodsList);
  app.route('/catalog')
  .get(List.ContrGetForGoodsListAll);
  
};
*/

