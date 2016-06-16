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

var news = require("./Controller/news");
app.use('/news', news);

var events = require("./Controller/events");
app.use('/events', events);

app.get('/upload', function(req, res) {
  res.sendFile(__dirname + "/uploadForm.html");
});

app.get('/', function(req, res) {
  res.json(['ngapain bro']);
});

app.get('/optimise', function(req, res)) {
  res.status(1102);
  res.json({'foo' : 'bar'});
}

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
    app.listen((process.env.PORT || 8082), function() {

      console.log("app running on " + (process.env.PORT || 8082));

    });
  }
});
