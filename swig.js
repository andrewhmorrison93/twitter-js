var swig = require("swig");

var data = {
	title: "A Title",
	people: [{name: "Gandolf"}, {name: "Jon"}] 
};

swig.renderFile(__dirname + "/views/index.html", data, function(err, output) {
	if (err) {
		throw err;
	}

	console.log(output);
})