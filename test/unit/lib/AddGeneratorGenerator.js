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
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-generator/template", dst: DST}, {});
    });

    fin("*", function() {
      DST_DIR.remove();
    });

    test("generate(answers) - name:'word'", function() {
      gen.generate({name: "word", desc: "The description.", snippet: false});
      file(DST, "lib", "WordGenerator.js").must.exist();
      file(DST, "lib", "WordGenerator.js").text.must.contain("\"The description.\"");
      file(DST, "test/unit/lib", "WordGenerator.js").must.exist();
    });

    test("generate(answers) - name:'several words'", function() {
      gen.generate({name: "one two", desc: "The description.", snippet: false});
      file(DST, "lib", "OneTwoGenerator.js").must.exist();
      file(DST, "lib", "OneTwoGenerator.js").text.must.contain("\"The description.\"");
      file(DST, "test/unit/lib", "OneTwoGenerator.js").must.exist();
    });

    test("generate(answers) - name:'several-words'", function() {
      gen.generate({name: "one-two", desc: "The description.", snippet: false});
      file(DST, "lib", "OneTwoGenerator.js").must.exist();
      file(DST, "lib", "OneTwoGenerator.js").text.must.contain("\"The description.\"");
      file(DST, "test/unit/lib", "OneTwoGenerator.js").must.exist();
    });

    test("generate(answers) - snippet generator", function() {
      gen.generate({name: "word", desc: "The description.", snippet: true});
      file(DST, "lib", "WordGenerator.js").must.exist();
      file(DST, "lib", "WordGenerator.js").text.must.contain("\"The description.\"");
      file(DST, "lib", "WordGenerator.js").text.must.contain("mute: true");
      file(DST, "test/unit/lib", "WordGenerator.js").must.exist();
    });

    test("generate(answers) - file generator", function() {
      gen.generate({name: "word", desc: "The description.", snippet: false});
      file(DST, "lib", "WordGenerator.js").must.exist();
      file(DST, "lib", "WordGenerator.js").text.must.contain("\"The description.\"");
      file(DST, "lib", "WordGenerator.js").text.must.not.contain("mute: true");
      file(DST, "test/unit/lib", "WordGenerator.js").must.exist();
    });
  });
})();