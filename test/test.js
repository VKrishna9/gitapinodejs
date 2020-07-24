var supertest = require("supertest");
var should = require("should");


var server = supertest.agent("http://localhost:3000/v1/api");


describe("SAMPLE unit test",function(){


  it("should return user object",function(done){

    server
    .post("/gitapi/validateuser")
    .send({"username": "admin", "password": "password", "userrole": ""})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });

});