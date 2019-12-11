var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MasterChalSchema = new Schema({
    masterID: {type: String, required: true},
    type: { type: String, required: true },
    text: { type: String, required: true },
});

module.exports = mongoose.model('masterChal', MasterChalSchema);