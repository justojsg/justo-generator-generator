//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Generator = require("../../../dist/es5/nodejs/justo-generator-generator")["add generator"];

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});
      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST_DIR, DST;

    init("*", function() {
      DST_DIR = Dir.createTmpDir();
      DST = DST_DIR.path;
      gen = new Generator({src: "dist/es5/nodejs/justo-generator-generator/template", dst: DST}, {});
    });

    fin("*", function() {
      DST_DIR.remove();
    });

    test("generate(answers) - name:'word'", function() {
      gen.generate({name: "word"});
      file(DST, "lib", "WordGenerator.js").must.exist();
      file(DST, "test/unit/lib", "WordGenerator.js").must.exist();
    });

    test("generate(answers) - name:'several words'", function() {
      gen.generate({name: "one two"});
      file(DST, "lib", "OneTwoGenerator.js").must.exist();
      file(DST, "test/unit/lib", "OneTwoGenerator.js").must.exist();
    });
  });
})();
