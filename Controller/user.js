var express = require("express");
var userRouter = express.Router();
var constant = require("../constant");

var bodyParser = require("body-parser");
userRouter.use(bodyParser.json());

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
          res.json({'data' : {'user' : first, 'token' : token}});
        } else
        {
          res.status(500);
          res.json({'message' : 'server failed', 'error' : err});
        }
      });
    } else
    {
      res.status(404);
      res.json({'message' : 'user not found'});
    }
  });
});

module.exports = userRouter;
