var supertest = require("supertest");
var should = require("should");


var server = supertest.agent("http://localhost:3000/v1/api");


describe("SAMPLE unit test",function(){

  it("should return saves search",function(done){

    server
    .post('/gitapi/reports')
    .expect("Content-type",/json/)
    .expect(401)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      res.body.data.should.equal(30);
      done();
    });
  });

});