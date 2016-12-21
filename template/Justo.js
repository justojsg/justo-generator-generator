//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
{{#if (eq scope.linter "JSHint")}}
const jslinter = require("justo-plugin-jshint");
{{else if (eq scope.linter "ESLint")}}
const jslinter = require("justo-plugin-eslint");
{{/if}}
const npm = require("justo-plugin-npm");

//catalog
const jslint = catalog.simple({
  name: "jslint",
  desc: "Parse source code.",
  task: jslinter,
  params: {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "tett/unit/lib/"
    ]
  }
});

catalog.workflow({name: "build", desc: "Build the package"}, function() {
  jslint("Best practices and grammar (JavaScript)");

  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    presets: [{{#if (in scope.jsSpec "ES2015" "ES2016" "ES2017")}}"es2015"{{/if}}{{#if (in scope.jsSpec "ES2016" "ES2017")}}, "es2016"{{/if}}{{#if (eq scope.jsSpec "ES2017")}}, "es2017"{{/if}}],
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/{{dir.name}}/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/{{dir.name}}/lib"
    },
    {
      src: ["package.json", "README.md", "template/"],
      dst: "dist/es5/nodejs/{{dir.name}}/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.simple({
  name: "publish",
  desc: "Publish in NPM.",
  task: npm.publish,
  params: {
    who: "{{scope.npmWho}}",
    src: "dist/es5/nodejs/{{dir.name}}/"
  }
});

catalog.simple({
  name: "install",
  desc: "Install the generator to test.",
  task: npm.install,
  params: {
    pkg: "dist/es5/nodejs/{{dir.name}}/",
    global: true
  }
});

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
