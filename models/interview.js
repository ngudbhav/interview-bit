var mongoose = require('mongoose');

var interview = new mongoose.Schema({
	company:String,
	candidates: [String],
	time: Date,
	type: Integer
});

module.exports = mongoose.model('interview',interview,'interview');