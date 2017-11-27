var express = require('express');
var router = express.Router();
var db = require('./connection');

router.post( '/inventory', function( req, res ) {
    let SQL = `
        SELECT product.product, product.description, product_price.price,
               product_stock.stock, product_picture.path_to_picture
        FROM   product, product_price, product_stock, product_picture
        WHERE  product.product = product_price.fk_product AND
               product.product = product_stock.fk_product AND
               product.product = product_picture.fk_product
    `;

    db.query( SQL, function( err, rows ) {
        let row_count = rows.length;

        if( row_count > 0 ) {
            for( product in rows ) {
                console.log( product );
            }
            res.send( "Loaded products" );
        }
        else {
            res.send( "Couldnt load product info" );
        }
    });
});

//Returns the router as a useable variable
module.exports = router;
