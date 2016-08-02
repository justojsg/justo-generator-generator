//imports
const suite = require("justo").suite;
const test = require("justo").test;
const Generator = require("../../dist/es5/nodejs/justo-generator-generator");

//suite
suite("index", function() {
  test("default", function() {
    Generator.default.must.be.instanceOf(Function);
  });

  test("generator", function() {
    Generator["generator"].must.be.instanceOf(Function);
  });

  test("gen", function() {
    Generator["gen"].must.be.same(Generator["generator"]);
  });
})();
