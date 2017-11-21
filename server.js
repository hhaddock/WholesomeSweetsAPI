//Wholesome Sweets Bakery API
//Created By: Hayden Haddock, Michael Douglass, Devin Cargill, David Auger
//Port number for address
var port = 3000;

//NPM Modules
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

//Creating an instance of of the Express server
var app = express();

//Configure body-parser to use URLENCODED and json
//This is basic setup stuff for the server
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "testKey"}));

//Tell the express server which router file to look at
app.use('/user', require('./app/user.js'));
app.use('/product', require('./app/product.js'));
app.use('/order', require('./app/order.js'));

//Tell the express server to listen for traffic on the above port
app.listen(port);
console.log("The real programmers are gossiping about you on port " + port);
