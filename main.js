var express = require("express");
var app = express();

// MIDDLEWARES
var bike = require("./Controller/bike");
app.use('/bike', bike);

var images = require("./Controller/images");
app.use('/images', images);

var categories = require("./Controller/category");
app.use('/categories', categories);

var banners = require("./Controller/banner");
app.use('/banners', banners);

var user = require("./Controller/user");
app.use('/user', user);

app.get('/upload', function(req, res) {
  res.sendFile(__dirname + "/uploadForm.html");
});

app.get('/', function(req, res) {
  res.json(['ngapain bro']);
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongourl = 'mongodb://admin:admin@ds025973.mlab.com:25973/bikeantik';
var db = require("./db");

db.connect(mongourl, function (err) {
  if (err) {
    console.log('cannot connect to db');
    console.log(err);
  } else
  {
    app.listen(8082, function() {

      console.log("app running on 8082");

    });
  }
});
