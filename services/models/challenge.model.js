var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChallengeSchema = new Schema({
    user: {type: String, required: true },
    type: {type: String, required: true},
    text: {type: String, required: true},
    points: {type: Number, required: true}
});

module.exports = mongoose.model('Challenge', ChallengeSchema);