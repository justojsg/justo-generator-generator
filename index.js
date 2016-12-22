module.exports = {
  "default": require("./lib/Generator.js").default,
  "add gen": require("./lib/GeneratorGenerator.js").default,
  "promote": require("./lib/PromoteGenerator").default
};
