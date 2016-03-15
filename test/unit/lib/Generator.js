//imports
const path = require("path");
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const dir = require("justo-assert-fs").dir;
const Generator = require("../../../dist/es5/nodejs/justo-generator-generator").default;
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;

//suite
suite("Generator", function() {
  suite("#constructor()", function() {
    test("constructor()", function() {
      var gen = new Generator({});

      gen.must.be.instanceOf(Generator);
    });
  });

  suite("#generate()", function() {
    var gen, DST;

    init("*", function() {
      DST = Dir.createTmpDir();
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-generator/template", dst: DST.path}, {});
    });

    fin("*", function() {
      DST.remove();
    });

    test("generate(answers) - type:simple", function() {
      gen.generate({type: "simple", desc: "The description."});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = require(\"./lib/Generator\").default;");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      dir(DST.path, "template").must.exist();
      file(DST.path, "lib/Generator.js").must.exist();
      file(DST.path, "lib/Generator.js").text.must.contain("\"The description.\"");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/Generator.js").must.exist();
    });

    test("generate(answers) - type:composite", function() {
      gen.generate({type: "composite", desc: "The description."});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = {");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "Justo.json").must.exist();
      file(DST.path, "README.md").must.exist();
      dir(DST.path, "template").must.exist();
      file(DST.path, "lib/Generator.js").must.exist();
      file(DST.path, "lib/Generator.js").text.must.contain("\"The description.\"");
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/Generator.js").must.exist();
    });

    test("generate(answers) - type:unknown", function() {
      gen.generate.bind(gen).must.raise("Invalid generator type: unknown.", [{type: "unknown"}]);
    });
  });
})();
