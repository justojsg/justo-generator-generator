//imports
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

    init({name: "*", title: "Create tmp dir and generator"}, function() {
      DST = Dir.createTmpDir();
      gen = new Generator({mute: true, src: "dist/es5/nodejs/justo-generator-generator/template", dst: DST.path}, {});
    });

    fin({name: "*", title: "Delete tmp dir"}, function() {
      DST.remove();
    });

    test("generate(answers) - type:simple", function() {
      gen.generate({type: "simple", desc: "The description."});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = require(\"./lib/Generator\").default;");
      file(DST.path, "Justo.js").must.exist();
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
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = {");
      file(DST.path, "Justo.js").must.exist();
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

    test("generate(answers) - snippet generator", function() {
      gen.generate({type: "composite", desc: "The description.", snippet: true, snippetTemplate: "mysnippet"});

      file(DST.path, ".editorconfig").must.exist();
      file(DST.path, ".gitignore").must.exist();
      file(DST.path, ".jshintrc").must.not.exist();
      file(DST.path, ".eslintrc").must.not.exist();
      file(DST.path, ".travis.yml").must.exist();
      file(DST.path, "package.json").must.exist();
      file(DST.path, "index.js").must.exist();
      file(DST.path, "index.js").text.must.contain("module.exports = {");
      file(DST.path, "Justo.js").must.exist();
      file(DST.path, "README.md").must.exist();
      dir(DST.path, "template").must.exist();
      file(DST.path, "lib/Generator.js").must.exist();
      file(DST.path, "lib/Generator.js").must.contain([
        "\"The description.\"",
        "mute: true",
        "return this.templateAsString(\"snippets/mysnippet.hbs\", answers);"
      ]);
      dir(DST.path, "test/unit/data").must.exist();
      file(DST.path, "test/unit/index.js").must.exist();
      file(DST.path, "test/unit/lib/Generator.js").must.exist();
    });

    suite("JSSpec", function() {
      test("ES2015", function() {
        gen.generate({type: "simple", desc: "The description.", jsSpec: "ES2015"});

        file(DST.path, ".editorconfig").must.exist();
        file(DST.path, ".gitignore").must.exist();
        file(DST.path, ".jshintrc").must.not.exist();
        file(DST.path, ".eslintrc").must.not.exist();
        file(DST.path, ".travis.yml").must.exist();
        file(DST.path, "package.json").must.exist();
        file(DST.path, "package.json").must.contain("babel-preset-es2015");
        file(DST.path, "index.js").must.exist();
        file(DST.path, "index.js").text.must.contain("module.exports = require(\"./lib/Generator\").default;");
        file(DST.path, "Justo.js").must.exist();
        file(DST.path, "Justo.js").must.contain(["babel", "preset: \"es2015\""]);
        file(DST.path, "README.md").must.exist();
        dir(DST.path, "template").must.exist();
        file(DST.path, "lib/Generator.js").must.exist();
        file(DST.path, "lib/Generator.js").text.must.contain("\"The description.\"");
        dir(DST.path, "test/unit/data").must.exist();
        file(DST.path, "test/unit/index.js").must.exist();
        file(DST.path, "test/unit/lib/Generator.js").must.exist();
      });

      test("ES2016", function() {
        gen.generate({type: "simple", desc: "The description.", jsSpec: "ES2016"});

        file(DST.path, ".editorconfig").must.exist();
        file(DST.path, ".gitignore").must.exist();
        file(DST.path, ".jshintrc").must.not.exist();
        file(DST.path, ".eslintrc").must.not.exist();
        file(DST.path, ".travis.yml").must.exist();
        file(DST.path, "package.json").must.exist();
        file(DST.path, "package.json").must.contain("babel-preset-es2016");
        file(DST.path, "index.js").must.exist();
        file(DST.path, "index.js").text.must.contain("module.exports = require(\"./lib/Generator\").default;");
        file(DST.path, "Justo.js").must.exist();
        file(DST.path, "Justo.js").must.contain(["babel", "preset: \"es2016\""]);
        file(DST.path, "README.md").must.exist();
        dir(DST.path, "template").must.exist();
        file(DST.path, "lib/Generator.js").must.exist();
        file(DST.path, "lib/Generator.js").text.must.contain("\"The description.\"");
        dir(DST.path, "test/unit/data").must.exist();
        file(DST.path, "test/unit/index.js").must.exist();
        file(DST.path, "test/unit/lib/Generator.js").must.exist();
      });

      test("ES2017", function() {
        gen.generate({type: "simple", desc: "The description.", jsSpec: "ES2017"});

        file(DST.path, ".editorconfig").must.exist();
        file(DST.path, ".gitignore").must.exist();
        file(DST.path, ".jshintrc").must.not.exist();
        file(DST.path, ".eslintrc").must.not.exist();
        file(DST.path, ".travis.yml").must.exist();
        file(DST.path, "package.json").must.exist();
        file(DST.path, "package.json").must.contain("babel-preset-es2017");
        file(DST.path, "index.js").must.exist();
        file(DST.path, "index.js").text.must.contain("module.exports = require(\"./lib/Generator\").default;");
        file(DST.path, "Justo.js").must.exist();
        file(DST.path, "Justo.js").must.contain(["babel", "preset: \"es2017\""]);
        file(DST.path, "README.md").must.exist();
        dir(DST.path, "template").must.exist();
        file(DST.path, "lib/Generator.js").must.exist();
        file(DST.path, "lib/Generator.js").text.must.contain("\"The description.\"");
        dir(DST.path, "test/unit/data").must.exist();
        file(DST.path, "test/unit/index.js").must.exist();
        file(DST.path, "test/unit/lib/Generator.js").must.exist();
      });
    });

    suite("Linter", function() {
      test("ESLint", function() {
        gen.generate({type: "simple", desc: "The description.", linter: "ESLint"});

        file(DST.path, ".jshintrc").must.not.exist();
        file(DST.path, ".eslintrc").must.exist();
        file(DST.path, "package.json").must.contain("justo-plugin-eslint");
        file(DST.path, "package.json").must.not.contain("justo-plugin-jshint");
        file(DST.path, "Justo.js").must.contain("justo-plugin-eslint");
        file(DST.path, "Justo.js").must.not.contain("justo-plugin-jshint");
      });

      test("JSHint", function() {
        gen.generate({type: "simple", desc: "The description.", linter: "JSHint"});

        file(DST.path, ".jshintrc").must.exist();
        file(DST.path, ".eslintrc").must.not.exist();
        file(DST.path, "package.json").must.contain("justo-plugin-jshint");
        file(DST.path, "package.json").must.not.contain("justo-plugin-eslint");
        file(DST.path, "Justo.js").must.contain("justo-plugin-jshint");
        file(DST.path, "Justo.js").must.not.contain("justo-plugin-eslint");
      });
    });
  });
})();
