//import
import path from "path";
import {Generator} from "justo-generator";

/**
 * Generator of the Justo.js file.
 */
export default class extends Generator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
  get help() {
    return {
      desc: "Generate a Justo.js generator scaffold.",
      params: {
        type: "Generator type: 'simple' or 'composite'."
      },
      commands: {
        
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
    //none
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.type == "simple" || answers.type === undefined) {
      this.copy("index.simple.js", "index.js");
    } else if (answers.type == "composite") {
      this.copy("index.composite.js", "index.js");
    } else {
      throw new Error(`Invalid generator type: ${answers.type}.`);
    }

    this.copy("_editorconfig", ".editorconfig");
    this.copy("_gitignore", ".gitignore");
    this.copy("_jshintrc", ".jshintrc");
    this.copy("_travis.yml", ".travis.yml");
    this.template("_package.json", "package.json", {});
    this.template("Justo.js", {});
    this.copy("Justo.json");
    this.copy("README.md");
    this.mkdir("template");
    this.copy("lib/Generator.js");
    this.copy("test/unit/index.js");
    this.copy("test/unit/lib/Generator.js");
    this.mkdir("test/unit/data");
  }
}
