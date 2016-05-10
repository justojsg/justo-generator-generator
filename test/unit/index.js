//imports
const suite = require("justo").suite;
const test = require("justo").test;
const Generator = require("../../dist/es5/nodejs/justo-generator-generator");

//suite
suite("index", function() {
  test("default", function() {
    Generator.default.must.be.instanceOf(Function);
  });

  test("add generator", function() {
    Generator["add generator"].must.be.instanceOf(Function);
  });

  test("add gen", function() {
    Generator["add gen"].must.be.same(Generator["add generator"]);
  });
})();
