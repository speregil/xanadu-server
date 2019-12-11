var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    shownName: { type: String, required: true },
    admin: {type: Boolean, required: true},
    asign: {type: Boolean, required: true}
});

module.exports = mongoose.model('User', UserSchema);