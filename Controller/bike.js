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
  db.get().collection("bikes").find().toArray(function (err, bikes) {
    responseMaker.StandardSuccess(res, bikes, '');
  });
});

bikeRouter.post('/', function (req, res) {
  if (auth.IsAdmin(req, res) == false)
  {
    return
  }

  var bike = req.body
  var colour = bike.colour;
  if (colour == null || colour.length == 0)
  {
    responseMaker.StandardError(res, 500, 'please provide at least 1 colour');
    return
  }

  var categories = bike.categories;
  if (categories == null || categories.length == 0)
  {
    responseMaker.StandardError(res, 500, 'please provide at least 1 category');
    return
  }

  db.get().collection("bikes").insertOne(bike, function (err, result) {
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
