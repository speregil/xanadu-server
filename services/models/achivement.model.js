var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AchivementSchema = new Schema({
    userID: { type: String, required: true },
    points: { type: Number, required: true },
    text: { type: String, requires: true }
});

module.exports = mongoose.model('Achivement', AchivementSchema);