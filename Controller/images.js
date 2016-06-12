var path = require('path');
var express = require("express");
var constant = require("../constant");
var db = require("../db");
var auth = require("./auth");
var responseMaker = require("./responseMaker");

var imageRouter = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.png');
  }
});
var upload = multer({ storage : storage}).array('imgs', 10);

var bodyParser = require("body-parser");
imageRouter.use(bodyParser.json());

imageRouter.use('/', function (req, res, next) {
  // next();

  // console.log(req.params);
  var str = req.url;
  var re = /\/\w.+png/;
  var found = str.match(re);
  console.log(found);

  if (found)
  {
    next();
    return;
  }

  var header = req.headers;
  var token = header.usertoken;
  auth.Verify(token, req, res, next);
});

imageRouter.get('/', function (req, res) {
  db.get().collection("images").find().toArray(function (err, images){
    responseMaker.StandardSuccess(res, images, '');
  });
});

imageRouter.get('/:file', function(req, res) {
  var file = req.params.file;
  res.sendFile(path.resolve(__dirname + '/../images/' + file));
});

imageRouter.post('/', function (request, response) {
  if (auth.IsAdmin(request, response) == false)
  {
    return
  }
  console.log('uploading..');
  upload(request,response,function(err) {
    if(err) {
        console.log(err);
        responseMaker.StandardError(res, 500, 'error uploading file');
        return
    }

    var docs = [];
    request.files.forEach(function (item, index) {
      docs[index] = {'name' : item.filename};
    });

    console.log(docs);
    db.get().collection("images").insertMany(docs, function(err, res) {
      if (err)
      {
        console.log(err);
        responseMaker.StandardError(res, 500, constant.serverFailure);
      } else
      {
        responseMaker.StandardSuccess(res, res.ops, '');
      }
    });
  });
});

module.exports = imageRouter;
