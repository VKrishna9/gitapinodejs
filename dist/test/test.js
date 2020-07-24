"use strict";
var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000/v1/api");
// UNIT test begin
describe("SAMPLE unit test", function () {
    // #1 should return home page
    it("should return user object", function (done) {
        // calling home page api
        server
            .post("/findll/validateuser")
            .send({ "username": "admin", "password": "password", "userrole": "" })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
            // HTTP status should be 200
            res.status.should.equal(200);
            // Error key should be false.
            res.body.error.should.equal(false);
            done();
        });
    });
});
