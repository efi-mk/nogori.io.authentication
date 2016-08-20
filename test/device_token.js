/**
 * Created by efi on 16/08/16.
 */

var expect = require("chai").expect;
var DeviceToken = require("../models/device_token");
describe("DeviceToken model", function () {
    it("should be invalid if token is empty", function (done) {
        var dt = new DeviceToken();
        dt.validate(function (err) {
            expect(err.errors.token).to.exist;
            done();
        })
    });

    it("should be invalid if user_id is empty", function (done) {
        var dt = new DeviceToken();
        dt.validate(function (err) {
            expect(err.errors.user_id).to.exist;
            done();
        })
    });
});