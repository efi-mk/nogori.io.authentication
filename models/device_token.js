/**
 * Created by efi on 15/08/16.
 *
 * Used by the authentication service, holds device token in order to verify whether a device is allowed to connect to our system.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    token: {type: String, required: true, unique:true, index: true},
    user_id: {type: String, required: true, unique:true}
});

schema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('DeviceToken', schema);