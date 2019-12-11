var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: {type: String, required: true },
    master: {type: String, required: true},
    participants: [String]
});

module.exports = mongoose.model('Group', GroupSchema);