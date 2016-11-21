//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
{{#if (eq scope.linter "JSHint")}}
const lint = require("justo-plugin-jshint");
{{else if (eq scope.linter "ESLint")}}
const lint = require("justo-plugin-eslint");
{{/if}}
const publish = require("justo-plugin-npm").publish;
const install = require("justo-plugin-npm").install;

//catalog
const lnt = catalog.workflow({name: "lint", desc: "Parse source code."}, function() {
  lint("Best practices and grammar", {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "tett/unit/lib/"
    ]
  });
});

catalog.workflow({name: "build", desc: "Build the package"}, function() {
  lnt();

  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "{{lowercase scope.jsSpec}}",
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

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "{{scope.npmWho}}",
    src: "dist/es5/nodejs/{{dir.name}}/"
  });
});

catalog.workflow({name: "install", desc: "Install the generator to test."}, function() {
  install("Install", {
    pkg: "dist/es5/nodejs/{{dir.name}}/",
    global: true
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
