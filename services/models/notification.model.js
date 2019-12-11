var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    user: {type: String, required: true },
    mensaje: {type: String, required: true}
});

module.exports = mongoose.model('Notification', NotificationSchema);