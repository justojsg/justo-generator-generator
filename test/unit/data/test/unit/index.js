//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/{{dir.name}}");

//suite
suite("index", function() {
  test("default", function() {
    pkg["default"].must.be.instanceOf(Function);
  });
})();
