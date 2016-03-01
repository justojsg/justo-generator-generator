//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const pkg = require("../../dist/es5/nodejs/{{dir.name}}");

//suite
suite("index", function() {
  test("Generator #1", function() {
    pkg.XXX.must.be.instanceOf(Function);
  });

  test("Generator #2", function() {
    pkg.YYY.must.be.instanceOf(Function);
  });
})();
