var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function(io){

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());


router.get('/*', function (req, res, next) {
	var path = req.path;
	// console.log(path);

  var options = {
    root: __dirname + '/../public',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(path, options, function (err) {
    if (err) {
      // res.status(err.status);
      next();
    }
    else {
      console.log('Sent:', path);
    }
  });

})

router.get("/users/:name/tweets/:id", function(req, res) {
	var id = parseInt(req.params.id);
	var name = req.params.name;
	console.log(typeof id);
	var list = tweetBank.find( {name: name, id: id});
	console.log(name);
	console.log(list);
	res.render("index", {title: "Twitter.js - Individual Tweet by " + name, tweets: list });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list, name: name, showForm: true} );
});

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});



router.post("/submit", function(req, res) {
var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
})
// router.get("/stylesheets/:name", function(req, res) {
// 	var path = req.path;
// 	// console.log(req.path);
// 	// res.sendFile(__dirname + "/../public/stylesheets/" + req.params.name);
// 	res.sendFile(path);
// });




	return router;
}