"use strict";
var supertest = require("supertest");
var should = require("should");
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000/v1/api");
// UNIT test begin
describe("SAMPLE unit test", function () {
    it("should return git result object", function (done) {
        //calling ADD api
        server
            .post('/findall/repo')
            .send({ sch: "java", sch2: "smpp", link: "link", userId: "agent1" })
            .expect("Content-type", /json/)
            .expect(404)
            .end(function (err, res) {
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            res.body.data.should.equal(30);
            done();
        });
    });
});
