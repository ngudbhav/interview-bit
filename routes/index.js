var express = require('express');
var router = express.Router();
var moment = require('moment');

var interview = require('../models/interview');
var company = require('../models/company');
/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});
router.post('/', function(req, res, next) {
  console.log(req.body);
  //res.render('index', { title: 'Express', message: req.flash('message')});
  res.json('done');
});
let ty = '';
router.post('/register', function (req, res, next) {
	company.create({name: req.body.name.toLowerCase(), location: req.body.location}, function(error, results){
		if(error) throw error;
		else{
			interview.find({name: req.body.name}, function(error, results){
				if(error) throw error;
				else{
					res.render('company', {data:results});
					req.session.name = req.body.name.toLowerCase();
					ty=req.session.name;
				}
			});
		}
	});
});
router.get('/login', function(req, res, next){
	console.log(req.session.name);
	if(ty){
		interview.find({ name: ty }, function (error, results) {
			if (error) throw error;
			else {
				console.log(results);
				res.render('company', { data: results });
				req.session.name = req.body.name;
			}
		});
	}
	else{
		res.render('login');
	}
});
router.get('/add', function(req, res ,next){
	if(req.query.id){
		interview.findOne({_id:req.query.id}, function(error, results){
			if(error) throw error;
			else{
				console.log(results);
				res.render('add', {data: results});
			}
		});
	}
	else{
		res.render('add');
	}
});
router.post('/add', function(req, res ,next){
	let numbed = req.body.number;
	console.log(req.body.email);
	interview.create({ name: ty, candidates: req.body.email, time: req.body.time, type: req.body.type, number:numbed}, function(error, results){
		if(error) throw error;
		else{
			res.redirect('/login');
		}
	});
});
router.post('/login', function(req, res , next){
	interview.find({ name: req.body.name.toLowerCase() }, function (error, results) {
		if (error) throw error;
		else {
			req.session.name = req.body.name.toLowerCase();
			ty = req.session.name;
			res.redirect('/login');
		}
	});
});
router.get('/delete', function(req, res, next){
	let id = req.query.id;
	console.log(id);
	interview.remove({_id: id}, function(error, results){
		if(error) throw error;
		else{
			res.redirect('/login');
		}
	})
})
module.exports = router;
