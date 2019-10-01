var mongoose = require('mongoose');

var company = new mongoose.Schema({
    name: String,
    location: [String]
});

module.exports = mongoose.model('company', company, 'company');