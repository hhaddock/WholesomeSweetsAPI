var express = require('express');
var router = express.Router();
var db = require('./connection');

//This is an example route
//We do not need to include this in prod
router.get('/users', function(req,res){
  db.query('SELECT * FROM user', function(err, rows){
    res.json(rows);
  });
  console.log("Test Route");
});

router.post('/login', function(req, res){
  var user = req.body.user;
  var pass = req.body.pass;
  console.log("login attempt");
});

//Returns the router as a useable variable
module.exports = router;
