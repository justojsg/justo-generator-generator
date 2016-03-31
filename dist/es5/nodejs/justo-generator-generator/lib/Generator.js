"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);
var _justoGenerator = require("justo-generator");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);








  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, 
    opts, responses));}_createClass(_class, [{ key: "init", value: function init() 




















































    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "preprompt", value: function preprompt() 





    {
      if (new fs.Dir(this.dst).hasEntries()) return "Destination dir is not empty.";} }, { key: "prompt", value: function prompt(





    answers) {
      this.input("desc");
      this.input("homepage");
      this.list("type");
      if (!this.confirm({ name: "snippet", default: false })) this.confirm("checkDstDir");
      this.input("author");
      this.input("authorEmail");
      this.input("authorUrl");
      this.input("contributor");
      this.input("contributorEmail");
      this.input("contributorUrl");
      this.input("npmWho");
      if (this.confirm({ name: "git", default: true })) this.input("gitUrl");
      if (this.confirm({ name: "bugs", default: true })) {
        this.input("bugsUrl");
        this.input("bugsEmail");}} }, { key: "pregenerate", value: function pregenerate(






    answers) {} }, { key: "generate", value: function generate(






    answers) {
      if (answers.type == "simple" || answers.type === undefined) {
        this.copy("index.simple.js", "index.js");} else 
      if (answers.type == "composite") {
        this.copy("index.composite.js", "index.js");} else 
      {
        throw new Error("Invalid generator type: " + answers.type + ".");}


      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      this.copy("_jshintrc", ".jshintrc");
      this.copy("_travis.yml", ".travis.yml");
      this.template("_package.json", "package.json", answers);
      this.template("Justo.js", answers);
      this.copy("Justo.json");
      this.template("README.md", answers);
      this.mkdir("template");
      this.template("lib/Generator.js", answers);
      this.template("test/unit/lib/Generator.js");

      if (answers.type == "simple" || answers.type === undefined) {
        this.template("test/unit/index.simple.js", "index.js");} else 
      {
        this.template("test/unit/index.composite.js", "index.js");}


      this.mkdir("test/unit/data");} }, { key: "desc", get: function get() {return "Generate a Justo.js generator scaffold.";} }, { key: "params", get: function get() {return { type: { title: "Generator type", choices: ["simple", "composite"] }, snippet: { title: "Default generator is snippet generator?", type: "boolean" }, checkDstDir: { title: "Check whether the dir is empty?", type: "Boolean" }, npmWho: "NPM username", homepage: "Generator homepage", desc: "Generator description", author: "Author name", authorEmail: "Author email", authorUrl: "Author homepage", contributor: "Contributor name", contributorEmail: "Contributor email", contributorUrl: "Contributor homepage", git: { title: "Would you like to configure Git repository?", type: "Boolean" }, gitUrl: "Git URL", bugs: { title: "Would you like to configure bugs info?", type: "Boolean" }, bugsUrl: "Bugs homepage", bugsEmail: "Bugs email" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;