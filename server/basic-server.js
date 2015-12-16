/* Import node's http module: */
var http = require("http");
var handleRequest = require("./request-handler.js");
var express = require("express");
var app = express();

var port = 3000;

var ip = "127.0.0.1";

app.use('/', express.static('../client/client'));

app.use('/messages', handleRequest.requestHandler);



var server = app.listen(port, ip);
