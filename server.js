var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var r = [];
var x = [];
var y = [];
var port = process.env.PORT || 5000
var url = 'mongodb://heroku_wdc6qbx0:23a0thcm2i2343s0527tpu4u3a@ds157621.mlab.com:57621/heroku_wdc6qbx0';
//var url = 'mongodb://localhost:27017/signin';
var db;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('.'));

// Initialize connection once
MongoClient.connect(url, function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
app.listen(port, function() {
    console.log("listening.....");
});
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.get('/signinlist.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/singinlist.html'));

});

app.get('/signin.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/singin.html'));

});



app.get('/today', function(req, res) {
    
console.log(r);
db.collection('posts').find({"date":r[0]}).toArray(function(err, docs){

res.send(docs);

});

});


app.get('/data', function(req, res) {
    
db.collection('posts').find().toArray(function(err, docs){

res.send(docs);

});

});






app.post("/thankyou", function(req, res) {
    var username = req.body.name;
    var help = req.body.help;
    var time = req.body.time;
    var day = req.body.day;
    r.push(day);
  
  db.collection('posts').insertOne(
       {"username":username,"help":help,"date": day ,"time":time},function(err, docs) {
  if(docs) {
     
       res.send("Success");
       console.log("inside docs");
      }else {
        res.send("error");
      }
    
  });
});


app.get('/cool', function(request, response) {
  response.send(cool());
});


