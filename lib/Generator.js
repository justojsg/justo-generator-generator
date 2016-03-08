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
        authorUrl: "The author URL.",
        git: "Use Git: 'true' or 'false'.",
        gitUrl: "Git URL.",
        bugs: "Configure bugs: 'true' or 'false'.",
        bugsUrl: "Bugs homepage.",
        bugsEmail: "Bugs email."
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
    this.input({name: "desc", title: "Generator description"});
    this.input({name: "homepage", title: "Generator homepage"});
    this.list({name: "type", title: "Generator type", choices: ["simple", "composite"]});
    this.input({name: "author", title: "Author name"});
    this.input({name: "authorEmail", title: "Author email"});
    this.input({name: "authorUrl", title: "Author homepage"});
    this.input({name: "npmWho", title: "NPM username"});

    if (this.confirm({name: "git", title: "Would you like to configure Git repository?", default: true})) {
      this.input({name: "gitUrl", title: "  Git URL"});
    }

    if (this.confirm({name: "bugs", title: "Would you like to configure bugs info?", default: true})) {
      this.input({name: "bugsUrl", title: "  Bugs homepage"});
      this.input({name: "bugsEmail", title: "  Bugs email"});
    }
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
    this.template("_package.json", "package.json", answers);
    this.template("Justo.js", answers);
    this.copy("Justo.json");
    this.template("README.md", answers);
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
