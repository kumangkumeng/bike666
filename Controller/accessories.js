var express = require("express");
var bikeRouter = express.Router();
var constant = require("../constant");

var bodyParser = require("body-parser");
bikeRouter.use(bodyParser.json());

var db = require("../db");

var auth = require("./auth");
var responseMaker = require("./responseMaker");

bikeRouter.use(function (req, res, next) {
  var header = req.headers;
  var token = header.usertoken;
  auth.Verify(token, req, res, next);
});

bikeRouter.get('/', function (req, res) {
  console.log(req.isAdmin);
  console.log(req.query);

  var query = {};
  if (req.query.category)
  {
    query = {
      'categories' : {$in : [req.query.category]}
    };
  }

  db.get().collection("accessories").find(query).toArray(function (err, bikes) {
    responseMaker.StandardSuccess(res, bikes, '');
  });
});

bikeRouter.get('/:id', function (req, res) {
  console.log(req.isAdmin);
  var id = req.params.id;
  db.get().collection("accessories").findOne({'_id' : db.createID(id)}, function (err, item) {
    responseMaker.StandardSuccess(res, item, '');
  });
});

bikeRouter.post('/', function (req, res) {
  if (auth.IsAdmin(req, res) == false)
  {
    return
  }
  
  db.get().collection("accessories").insertOne(bike, function (err, result) {
    if (err)
    {
      console.log(err);
      responseMaker.StandardError(res, 500, 'db failure');
    } else
    {
      console.log(result);
      responseMaker.StandardSuccess(res, result.ops[0], '');
    }
  });
});

module.exports = bikeRouter;
