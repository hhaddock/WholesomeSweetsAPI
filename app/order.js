var express = require('express');
var router = express.Router();
var db = require('./connection');

router.post( '/create_order', function( req, res ) {
  checkAuthenticated(req.body.email, createOrder(res));
});

function createOrder(res){
  let SQL = `
    INSERT INTO order (order_num, fk_product, fk_email, quantity) VALUES (2, 'Brownies', 'cargilldevin@gmail.com', 2);
    INSERT INTO order_group (fk_order_num, order_group) VALUES(LAST_INSERT_ID(), '2');
    INSERT INTO order_complete (fk_order_group) VALUES ('0');
  `;

  db.query( SQL, function( err, rows ) {
      let row_count = rows.length;

      if( row_count > 0 ) {
          res.send( rows );
      }
      else {
          res.send( "Couldnt load product info" );
      }
  });
}//end submit order

function checkAuthenticated(email, callBack){
  var x = 0;
  db.query('SELECT active FROM user WHERE email = ?', [email], function(err, rows){
      let active = rows[0].active;
      if(active == 1){
        callback;
      }
  });
}

//Returns the router as a useable variable
module.exports = router;
