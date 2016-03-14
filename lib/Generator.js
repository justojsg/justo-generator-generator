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
      type: {
        title: "Generator type",
        choices: ["simple", "composite"]
      },
      npmWho: "NPM username",
      homepage: "Generator homepage",
      desc: "Generator description",
      author: "Author name",
      authorEmail: "Author email",
      authorUrl: "Author homepage",
      git: {
        title: "Would you like to configure Git repository?",
        type: "Boolean"
      },
      gitUrl: "Git URL",
      bugs: {
        title: "Would you like to configure bugs info?",
        type: "Boolean"
      },
      bugsUrl: "Bugs homepage",
      bugsEmail: "Bugs email"
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
    this.input({name: "desc"});
    this.input({name: "homepage"});
    this.list({name: "type"});
    this.input({name: "author"});
    this.input({name: "authorEmail"});
    this.input({name: "authorUrl"});
    this.input({name: "npmWho"});
    if (this.confirm({name: "git", default: true})) this.input({name: "gitUrl"});
    if (this.confirm({name: "bugs", default: true})) {
      this.input({name: "bugsUrl"});
      this.input({name: "bugsEmail"});
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
    this.template("lib/Generator.js", answers);
    this.template("test/unit/lib/Generator.js");

    if (answers.type == "simple" || answers.type === undefined) {
      this.template("test/unit/index.simple.js", "index.js");
    } else {
      this.template("test/unit/index.composite.js", "index.js");
    }

    this.mkdir("test/unit/data");
  }
}
