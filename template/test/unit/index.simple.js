//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const Generator = require("../../dist/es5/nodejs/{{dir.name}}");

//suite
suite("index", function() {
  test("Generator", function() {
    Generator.must.be.instanceOf(Function);
  });
})();
