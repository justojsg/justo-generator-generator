//import
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
  get desc() {
    return "Generate a Justo generator scaffold.";
  }

  /**
   * @override
   */
  get params() {
    return {
      name: "Generator name",
      desc: "Generator description",
      lifecycleMethods: {
        title: "Lifecycle methods to override?",
        options: ["init()", "preprompt()", "pregenerate()", "fin()"]
      },
      snippet: {
        title: "Snippet generator?",
        type: "Boolean"
      },
      snippetTemplate: "Snippet template file (without .hbs)",
      checkDstDir: {
        title: "Check whether the dir is empty?",
        type: "Boolean"
      }
    };
  }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("name");
    this.input("desc");
    if (this.confirm({name: "snippet", default: answers.name.startsWith("snippet")})) this.input("snippetTemplate");
    else this.confirm("checkDstDir");
    this.multiselect("lifecycleMethods");
  }

  /**
   * @override
   */
  generate(answers) {
    var name;

    //(1) get name
    name = answers.name.replace(/(^[a-z])|([- ][a-z])/g, (letter) => letter.toUpperCase()).replace(/[ -]/, "") + "Generator";

    //(2) generate
    this.template("lib/Generator.js", name + ".js", answers);
    if (answers.snippet) this.copy("template/snippets/snippet.hbs", answers.snippetTemplate + ".hbs");
    this.template("test/unit/lib/CompositeGenerator.js", name + ".js", {cmd: answers.name});
    this.append("index.js", `,\n  "${answers.name}": require("./lib/${name}").default`, {line: -3, type: "end"});
    this.append("test/unit/index.js", `\n  test("${answers.name}", function() {\n    pkg["${answers.name}"].must.be.instanceOf(Function);\n  });\n`, {line: -2});
  }
}
