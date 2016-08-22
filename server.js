var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var app = express();

var port = process.env.PORT || 3000;

//Config
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(busboy());
app.use(express.static('uploads'));
app.use(express.static('public'));

//Routes
var router = require('./routes/router')(express);
app.use(router);

//Listen
app.listen(port, function(){
    console.log("Server running on port : %s", port);
});