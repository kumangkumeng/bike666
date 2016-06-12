var express = require("express");
var db = require("../db");
var auth = require("./auth");
var responseMaker = require("./responseMaker");
var constant = require("../constant");

var catRouter = express.Router();

var bodyParser = require("body-parser");
catRouter.use(bodyParser.json());

catRouter.use(function (req, res, next) {
  var header = req.headers;
  var token = header.usertoken;
  auth.Verify(token, req, res, next);
});

catRouter.get('/', function (req, res) {
  db.get().collection("news").find({}, {full_content : 0}).toArray(function (err, cats) {
    responseMaker.StandardSuccess(res, cats, '');
  });
});

catRouter.get('/:id', function (req, res) {
  var id = req.params.id;
  var query = {'_id' : db.createID(id) };
  db.get().collection("news").findOne({query}, function(err, item) {
    responseMaker.StandardSuccess(res, item, '');
  });
});

catRouter.post('/', function (req, res) {
  if (auth.IsAdmin(req, res) == false)
  {
    return
  }
  var cat = req.body;
  db.get().collection("news").insertOne(cat, function (err, result) {
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

module.exports = catRouter;
