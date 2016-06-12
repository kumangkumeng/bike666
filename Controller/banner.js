var express = require("express");
var bannRouter = express.Router();

var constant = require("../constant");

var bodyParser = require("body-parser");
bannRouter.use(bodyParser.json());

var db = require("../db");

var auth = require("./auth");
var responseMaker = require("./responseMaker");

bannRouter.use(function (req, res, next) {
  var header = req.headers;
  var token = header.usertoken;
  auth.Verify(token, req, res, next);
});

bannRouter.get('/', function (req, res) {
  db.get().collection("banners").find().toArray(function (err, bikes) {
    responseMaker.StandardSuccess(res, bikes, '');
  });
});

bannRouter.post('/', function (req, res) {
  if (auth.IsAdmin(req, res) == false)
  {
    return
  }
  var bike = req.body
  db.get().collection("banners").insertOne(bike, function (err, result) {
    if (err)
    {
      console.log(err);
      responseMaker.StandardError(res, 500, constant.serverFailure);
    } else
    {
      responseMaker.StandardSuccess(res, result.ops[0], '');
    }
  });
});

module.exports = bannRouter;
