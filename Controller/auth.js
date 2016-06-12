var jwt = require('jsonwebtoken');
var constant = require("../constant");
var responseMaker = require("./responseMaker");

exports.youreNotAdmin = "you're not admin"

exports.Create = function(user, done)
{
  console.log('creating token for : ');
  console.log(user);
  var token = jwt.sign(user, 'somesecret');
  done(null, token);
}

exports.Verify = function(token, req, res, next)
{
  console.log('verifiying..');
  jwt.verify(token, 'somesecret', function(err, decoded) {
    console.log(decoded)
    var isAdmin = false;
    if (token == constant.devToken)
    {
      req.isAdmin = isAdmin;
      next();
    } else if (err)
    {
      console.log(err);
      responseMaker.StandardError(res, 501, 'auth failed');
    } else
    {
      if (decoded.role)
      {
        isAdmin = decoded.role == 1;
      }
      req.isAdmin = isAdmin;
      next();
    }
  });
}

exports.IsAdmin = function(req, res)
{
  if (!req.isAdmin)
  {
    responseMaker.StandardError(res, 501, constant.youreNotAdmin);
  }

  return req.isAdmin
}
