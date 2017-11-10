//Wholesome Sweets Bakery API
//Created By: Hayden Haddock, Michael Douglass, Devin Cargill, David Auger
//Port number for address
var port = 3000;

//NPM Modules
var express = require('express');
var bodyParser = require('body-parser');

//Creating an instance of of the Express server
var app = express();

//Configure body-parser to use URLENCODED and json
//This is basic setup stuff for the server
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Tell the express server to look at the router
//for /api and reference it through the router.js file
app.use('/api', require('./app/router.js'));

//Tell the express server to listen for traffic on the above port
app.listen(port);
console.log("The real programmers are gossiping about you on port " + port);
