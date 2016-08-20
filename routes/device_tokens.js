var express = require('express');
var router = express.Router();

var uuid = require('node-uuid');


var DeviceToken = require('../models/device_token');

router.post('/:user_id', function (req, res, next) {
    var userId = req.params.user_id;
    var token = req.body.token;
    var deviceToken = new DeviceToken({
        token: token,
        user_id: userId
    });
    deviceToken.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: result
        });
    });
});

router.get('/:token', function (req, res, next) {
    var deviceToken = req.params.token;

    DeviceToken.findOne({token: deviceToken}, function (err, doc) {
        if (err) {
            return res.status(500).json({
                message: 'User could not be found',
                // TODO - log this error message no need to return it.
                error: err
            });
        }
        if (!doc) {
            return res.status(404).json({
                message: 'User could not be found'
            });
        }
        res.status(200).json({
            message: 'Success',
            token: doc.token,
            user_id: doc.user_id
        });
    })
});

module.exports = router;