//import
import path from "path";
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
    return "Generate a Justo.js generator scaffold.";
  }

  /**
   * @override
   */
  get params() {
    return {
      name: "Generator name",
      desc: "Generator description"
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
    this.input({name: "name"});
    this.input({name: "desc"});
  }

  /**
   * @override
   */
  generate(answers) {
    var name;

    //(1) get name
    name = answers.name.replace(/(^[a-z])|(-[a-z])/g, (letter) => letter.toUpperCase()).replace(/[ -]/, "") + "Generator";

    //(2) generate
    this.template("lib/Generator.js", name + ".js", answers);
    this.template("test/unit/lib/CompositeGenerator.js", name + ".js", {cmd: answers.name});
  }
}
