var express = require("express");
var swig = require("swig");
var app = express();
var routes = require("./routes/");
var socketio = require("socket.io");

// //create middleware that logs the verb and the route
app.use(function(request, response, next) {
	console.log(request.method + " " + request.path);
	next();
});

app.use("/", routes(io));

app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
swig.setDefaults({ cache: false });

// var data = {
// 	title: "A Title",
// 	people: [{name: "Gandolf"}, {name: "Jon"}] 
// };


// swig.renderFile(__dirname + "/views/index.html", data, function(err, output) {
// 	if (err) {
// 		throw err;
// 	}

// 	console.log(output);
// })



var port = 3000;

//create a server that listens on port 3000
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
var io = socketio.listen(server);













// //create a get when receives "/"
// app.get("/", function(request, response) {
// 	// response.send("Hello World!");
// 	response.render("index", data);
// });



// //handle "/news"
// app.get("/news", function(request, response) {
// 	response.send("In the News");
// });



