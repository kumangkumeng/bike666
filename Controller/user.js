var express = require("express");
var userRouter = express.Router();
var constant = require("../constant");

var bodyParser = require("body-parser");
userRouter.use(bodyParser.json());

var responseMaker = require("./responseMaker");

var db = require("../db");

var auth = require("./auth");

userRouter.post('/auth', function (req, res) {
  var body = req.body;
  var username = body.username;
  var password = body.password;

  db.get().collection('users').find({'username' : username, 'password' : password}).toArray(function (err, user) {
    var first = user[0];
    if (first)
    {
      first.password = null;
      auth.Create(first, function(err, token) {
        if (token)
        {
          responseMaker.StandardSuccess(res, {'user' : first, 'token' : token}, '');
        } else
        {
          responseMaker.StandardError(res, 500, constant.serverFailure);
        }
      });
    } else
    {
      responseMaker.StandardError(res, 404, 'user not found');
    }
  });
});

module.exports = userRouter;
