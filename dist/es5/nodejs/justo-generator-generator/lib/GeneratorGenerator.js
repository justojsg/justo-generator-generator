"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);








  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this,
    opts, responses));
  }_createClass(_class, [{ key: "init", value: function init()


































    {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "init", this).call(this);
    } }, { key: "fin", value: function fin()




    {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "fin", this).call(this);
    } }, { key: "prompt", value: function prompt(




    answers) {
      this.input("name");
      this.input("desc");
      if (this.confirm({ name: "snippet", default: answers.name.startsWith("snippet") })) this.input("snippetTemplate");else
      this.confirm("checkDstDir");
      this.multiselect("lifecycleMethods");
    } }, { key: "generate", value: function generate(




    answers) {
      var name;


      name = answers.name.replace(/(^[a-z])|([- ][a-z])/g, function (letter) {return letter.toUpperCase();}).replace(/[ -]/, "") + "Generator";


      this.template("lib/Generator.js", name + ".js", answers);
      if (answers.snippet) this.copy("template/snippets/snippet.hbs", answers.snippetTemplate + ".hbs");
      this.template("test/unit/lib/CompositeGenerator.js", name + ".js", { cmd: answers.name });
      this.append("index.js", ",\n  \"" + answers.name + "\": require(\"./lib/" + name + "\").default", { line: -3, type: "end" });
      this.append("test/unit/index.js", "\n  test(\"" + answers.name + "\", function() {\n    pkg[\"" + answers.name + "\"].must.be.instanceOf(Function);\n  });\n", { line: -2 });
    } }, { key: "desc", get: function get() {return "Generate a Justo generator scaffold.";} }, { key: "params", get: function get() {return { name: "Generator name", desc: "Generator description", lifecycleMethods: { title: "Lifecycle methods to override?", options: ["init()", "preprompt()", "pregenerate()", "fin()"] }, snippet: { title: "Snippet generator?", type: "Boolean" }, snippetTemplate: "Snippet template file (without .hbs)", checkDstDir: { title: "Check whether the dir is empty?", type: "Boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;