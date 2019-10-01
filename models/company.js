var mongoose = require('mongoose');

var company = new mongoose.Schema({
    company: String,
    location: [String]
});

module.exports = mongoose.model('company', company, 'company');