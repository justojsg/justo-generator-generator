//import
import path from "path";
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator of the Justo.js file.
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
  get help() {
    return {
      desc: "Generate a Justo.js generator scaffold.",
      params: {
        type: "Generator type: 'simple' or 'composite'.",
        npmWho: "The NPM user to use for publishing.",
        homepage: "The project homepage.",
        desc: "The generator description.",
        author: "The author name.",
        authorEmail: "The author email.",
        authorUrl: "The author URL."
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
    this.template("_package.json", "package.json", {
      author: answers.author,
      authorEmail: answers.authorEmail,
      authorUrl: answers.authorUrl,
      desc: answers.desc,
      homepage: answers.homepage
    });
    this.template("Justo.js", {npmWho: answers.npmWho});
    this.copy("Justo.json");
    this.copy("README.md");
    this.mkdir("template");
    this.copy("lib/Generator.js");
    this.template("test/unit/lib/Generator.js");
    if (answers.type == "simple" || answers.type === undefined) {
      this.template("test/unit/index.simple.js", "index.js");
    } else {
      this.template("test/unit/index.composite.js", "index.js");
    }
    this.mkdir("test/unit/data");
  }
}
