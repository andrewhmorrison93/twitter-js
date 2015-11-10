var express = require("express");
var app = express();
var port = 3000;

//create a server that listens on port 3000
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

//create middleware that logs the verb and the route
app.use(function(request, response, next) {
	console.log(request.method + " " + request.path);
	next();
});


//create a get when receives "/"
app.get("/", function(request, response) {
	response.send("Hello World!");
});



//handle "/news"
app.get("/news", function(request, response) {
	response.send("In the News");
});

