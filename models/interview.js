var mongoose = require('mongoose');

var interview = new mongoose.Schema({
	name:String,
	candidates: [String],
	time: Date,
	number: Number,
	type: Number
});

module.exports = mongoose.model('interview',interview,'interview');