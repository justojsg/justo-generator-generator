//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const copy = require("justo-plugin-fs").copy;
const clean = require("justo-plugin-fs").clean;
const lint = require("justo-plugin-eslint");
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
      "test/unit/lib/"
    ]
  });
});

catalog.workflow({name: "build", desc: "Build the package"}, function() {
  clean("Remove build directory", {
    dirs: ["build/es5"]
  });

  lnt();

  // lint("Best practices and grammar", {
  //   output: true,
  //   src: [
  //     "index.js",
  //     "Justo.js",
  //     "lib/",
  //     "test/unit/index.js",
  //     "test/unit/lib/"
  //   ]
  // });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Remove dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-generator-generator/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-generator-generator/lib"
    },
    {
      src: ["package.json", "README.md", "template/"],
      dst: "dist/es5/nodejs/justo-generator-generator/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit testing"}, {
  require: "justo-assert",
  src: ["test/unit/index.js", "test/unit/lib/"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-generator-generator"
  });
});

catalog.workflow({name: "install", desc: "Install the generator to test."}, function() {
  install("Install", {
    pkg: "dist/es5/nodejs/justo-generator-generator/",
    global: true
  });
});

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
