"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};var _path = require("path");var _path2 = _interopRequireDefault(_path);var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);










  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, 
    opts, responses));}_createClass(_class, [{ key: "init", value: function init() 









































    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "prompt", value: function prompt(





    answers) {
      this.input({ name: "desc" });
      this.input({ name: "homepage" });
      this.list({ name: "type" });
      this.input({ name: "author" });
      this.input({ name: "authorEmail" });
      this.input({ name: "authorUrl" });
      this.input({ name: "npmWho" });
      if (this.confirm({ name: "git", default: true })) this.input({ name: "gitUrl" });
      if (this.confirm({ name: "bugs", default: true })) {
        this.input({ name: "bugsUrl" });
        this.input({ name: "bugsEmail" });}} }, { key: "generate", value: function generate(






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


      this.mkdir("test/unit/data");} }, { key: "desc", get: function get() {return "Generate a Justo.js generator scaffold.";} }, { key: "params", get: function get() {return { type: { title: "Generator type", choices: ["simple", "composite"] }, npmWho: "NPM username", homepage: "Generator homepage", desc: "Generator description", author: "Author name", authorEmail: "Author email", authorUrl: "Author homepage", git: { title: "Would you like to configure Git repository?", type: "Boolean" }, gitUrl: "Git URL", bugs: { title: "Would you like to configure bugs info?", type: "Boolean" }, bugsUrl: "Bugs homepage", bugsEmail: "Bugs email" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;