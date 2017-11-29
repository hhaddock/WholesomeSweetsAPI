var express = require('express');
var router = express.Router();
var db = require('./connection');

var temp_order_group = 0;
var temp_order_num = 0;

router.post( '/create_order', function( req, res ) {
  checkAuthenticated(res ,req.body);
});

function insert_order(res, body){
  // insert into order
  db.query('INSERT INTO `order` (fk_product, fk_email, quantity, date_submitted) VALUES (?, ?, ?, NOW())', [body.product, body.email, body.quantity], function(err, rows){
    // insert into order_group with next highest order_group
    db.query('SELECT order_group FROM `order_group` ORDER BY order_group DESC LIMIT 1', function(err, rows){
      // get last order_group and bump one
      if(body.order_group == -1){//if order_group isn't set it is a new order
        let order_group = ++rows[0].order_group;
        db.query('INSERT INTO order_group (fk_order_num, order_group) VALUES(LAST_INSERT_ID(), ?)', [order_group], function(err, rows){
          // insert into order_complete
          db.query('INSERT INTO order_complete (fk_order_group, status) VALUES (?, 0)', [order_group], function(err, rows){
            res.send(String(order_group));
          });
        });
      } else {
        let order_group = parseInt(body.order_group, 10);
        db.query('INSERT INTO order_group (fk_order_num, order_group) VALUES(LAST_INSERT_ID(), ?)', [order_group], function(err, rows){
          // insert into order_complete
          res.send(String(order_group));
        });
      }
    });
  });
}

function checkAuthenticated(res, body){
  var x = 0;
  db.query('SELECT active FROM user WHERE email = ?', [body.email], function(err, rows){
    if(rows[0].active == 1){
      insert_order(res, body);
    } else {
      res.send("not logged in");
    }
  });
}

//Returns the router as a useable variable
module.exports = router;
