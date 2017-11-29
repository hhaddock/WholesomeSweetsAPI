var express = require('express');
var router = express.Router();
var db = require('./connection');

router.post( '/create_order', function( req, res ) {
  checkAuthenticated(req.body.email, createOrder(res, req.body));
});


// for creating we need the email, product, and quantity
function createOrder(res, body){
  var order_group = getNextOrderGroup();
  insertOrder(res, body.product, body.email, body.quantity, insertOrderGroup(res, order_group, insertOrderComplete(res, order_group)));
}//end submit order

function insertOrder(res, fk_product, fk_email, quantity, callBack){
  let SQL = 'INSERT INTO `order` (fk_product, fk_email, quantity) VALUES (?, ?, ?)';
  db.query(SQL, [fk_product, fk_email, quantity], function(err, rows){
    callBack;
  });
}

function getNextOrderGroup(){
  db.query("SELECT order_group FROM order_group ORDER BY order_group ASC LIMIT 1", function(err, rows){
    return rows[0].order_group++;
  });
}

function insertOrderGroup(res, order_group, callBack){
  let SQL = `
    INSERT INTO order_group (fk_order_num, order_group) VALUES(LAST_INSERT_ID(), ?)
  `;
  db.query(SQL, [order_group], function(err, rows){
    callBack;
  });
}

function insertOrderComplete(res, fk_order_group){
  let SQL = `
    INSERT INTO order_complete (fk_order_group) VALUES (?)
  `;
  db.query(SQL, [fk_order_group], function(err, rows){
    res.send("Order completed");
  });
}

function checkAuthenticated(email, callBack){
  var x = 0;
  db.query('SELECT active FROM user WHERE email = ?', [email], function(err, rows){
      let active = rows[0].active;
      if(active == 1){
        callBack;
      }
  });
}

//Returns the router as a useable variable
module.exports = router;
