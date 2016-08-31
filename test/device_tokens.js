/**
 * Created by efi on 18/08/16.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');


var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var DeviceToken = require('../models/device_token')
var server = require('../app');

chai.use(chaiHttp);

mockgoose(mongoose);

describe("Device token api", function () {

    // before(function() {
    //     mockgoose(mongoose).then(function() {
    //         mongoose.connect('mongodb://example.com/TestingDB', function(err) {
    //             done(err);
    //         });
    //     });
    // });

    beforeEach(function () {
        mockgoose.reset();

    });

    it("Error while creating a token for a specific user", function (done) {
        sinon.stub(DeviceToken.prototype, 'save');
        try {
            var err = "Error saving";
            DeviceToken.prototype.save.yields(err, null);
            chai.request(server).post('/token/v1/1234').end(function (err, res) {
                chai.expect(err).to.exist;
                done();
            });
        } catch (error) {
            console.error(error);
        } finally {
            DeviceToken.prototype.save.restore();
        }
    });

    it("Creating token successfully", function (done) {
        chai.request(server).post('/token/v1/1234').send({token: 'token'}).end(function (err, res) {
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body.message).to.equal('Success');
            chai.expect(res.body.obj).to.exist;
            chai.expect(res.body.obj.token).to.equal('token');
            chai.expect(res.body.obj.user_id).to.equal('1234');
            done();
        });
    });


    it("Error while getting a token for a unknown user", function (done) {

        chai.request(server).get('/token/v1/1234').end(function (err, res) {
            chai.expect(err).to.exist;
            chai.expect(res.status).to.equal(404);
            chai.expect(res.body.message).to.equal('User could not be found');
            done();
        });
    });

    it("Error while getting a token for a unknown user", function (done) {

        chai.request(server).get('/token/v1/1234').end(function (err, res) {
            chai.expect(err).to.exist;
            chai.expect(res.status).to.equal(404);
            chai.expect(res.body.message).to.equal('User could not be found');
            done();
        });
    });

    it("Retrieve token successfully", function (done) {
        // Save first
        chai.request(server).post('/token/v1/1234').send({token: 'token'}).end(function (err, res) {
            // Now retrieve
            chai.request(server).get('/token/v1/token').end(function (err, res) {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body.message).to.equal('Success');
                chai.expect(res.body.token).to.equal('token');
                chai.expect(res.body.user_id).to.equal('1234');
                done();
            });
        });

    });
});