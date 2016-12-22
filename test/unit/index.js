//imports
const suite = require("justo").suite;
const test = require("justo").test;
const pkg = require("../../dist/es5/nodejs/justo-generator-generator");

//suite
suite("index", function() {
  test("default", function() {
    pkg.default.must.be.instanceOf(Function);
  });

  test("add gen", function() {
    pkg["add gen"].must.be.instanceOf(Function);
  });

  test("promote", function() {
    pkg["promote"].must.be.instanceOf(Function);
  });
})();
