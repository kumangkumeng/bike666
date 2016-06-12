var express = require("express");
var db = require("../db");
var auth = require("./auth");
var responseMaker = require("./responseMaker");
var constant = require("../constant");

var geolib = require("geolib");

var catRouter = express.Router();

var bodyParser = require("body-parser");
catRouter.use(bodyParser.json());

catRouter.use(function (req, res, next) {
  var header = req.headers;
  var token = header.usertoken;
  auth.Verify(token, req, res, next);
});

catRouter.get('/', function (req, res) {
  db.get().collection("events").find().toArray(function (err, cats) {
    responseMaker.StandardSuccess(res, cats, '');
  });
});

catRouter.get('/nearby', function (req, res) {
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var max = req.query.max;

  if (!latitude || !longitude || !max)
  {
    responseMaker.StandardError(res, 500, 'Incomplete parameters');
    return
  }

  db.get().collection("events").find().toArray(function (err, cats) {
    var nearbies = [];
    for (var i = 0; i < cats.length; i++)
    {
      var e = cats[i];
      var distance = geolib.getDistance(
          {latitude: latitude, longitude: longitude},
          {latitude: e.latitude, longitude: e.longitude}
      );
      if (distance <= max)
      {
        var c = nearbies.length;
        nearbies[c] = e;
      }
    }
    responseMaker.StandardSuccess(res, nearbies, '');
  });
});

catRouter.get('/:id', function (req, res) {
  var id = req.params.id;
  var query = {'_id' : db.createID(id) };
  db.get().collection("events").findOne({query}, function(err, item) {
    responseMaker.StandardSuccess(res, cats, '');
  });
});

catRouter.post('/', function (req, res) {
  if (auth.IsAdmin(req, res) == false)
  {
    return
  }
  var cat = req.body;
  db.get().collection("events").insertOne(cat, function (err, result) {
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
