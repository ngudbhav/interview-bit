var express = require('express');
var router = express.Router();
var moment = require('moment');

var auth_user = require('../models/interview');

/* GET home page. */
router.get('/', function(req, res, next){
	res.send('complete');
});
router.post('/', function(req, res, next) {
  console.log(req.body);
  //res.render('index', { title: 'Express', message: req.flash('message')});
  res.json('done');
});
router.post('/register', function (req, res, next) {
	
});
module.exports = router;
