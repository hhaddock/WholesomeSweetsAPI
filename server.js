//Wholesome Sweets Bakery API
//Created By: Hayden Haddock, Michael Douglass, Devin Cargill, David Auger
//Port number for address
var port = 3000;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// app.use('/api', require('./routes/routes.js'));

app.listen(port);
console.log("The real programmers are gossiping about you on port " + port);
