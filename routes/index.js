var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


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



router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

// router.get("/stylesheets/:name", function(req, res) {
// 	var path = req.path;
// 	// console.log(req.path);
// 	// res.sendFile(__dirname + "/../public/stylesheets/" + req.params.name);
// 	res.sendFile(path);
// });



module.exports = router;