const express = require('express');
var ExpressPeerServer = require('peer').ExpressPeerServer;
const app = new express();
const opn = require('opn')

var options = {
    debug: true
}
var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, options);


app.use(express.static(__dirname + '/' ));
app.use('/peerjs', peerserver);

opn('http://localhost:8080');

server.listen(9000);


app.get('/', function(request, response){
    response.sendfile('html/index.html');
}).listen(8080);

console.log("App started at http://localhost:8080");
console.log("Created by Daryll Joshua Magsombol");