var express = require('express');
var router = express.Router();
var db = require('../connection');

//This is an example route
//We do not need to include this in prod
router.get('/users', function(req,res){
  // db.query('SELECT * FROM uni_branches', function(err, rows){
  //   res.json(rows);
  // });
  console.log("Test Route");
});

//Returns the router as a useable variable
module.exports = router;