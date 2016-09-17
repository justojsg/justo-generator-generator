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
    return "Generate a Justo.js generator scaffold.";
  }

  /**
   * @override
   */
  get params() {
    return {
      author: "Author name",
      authorEmail: "Author email",
      authorUrl: "Author homepage",
      bugsUrl: "Bugs homepage",
      bugsEmail: "Bugs email",
      checkDstDir: {
        title: "Check whether the dir is empty?",
        type: "Boolean"
      },
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorUrl: "Contributor homepage",
      davidDm: "David DM",
      desc: "Generator description",
      gitUrl: "Git URL",
      homepage: "Generator homepage",
      linter: {
        title: "Code linter",
        choices: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      npmWho: "NPM username",
      snippet: {
        title: "Default generator is snippet generator?",
        type: "boolean"
      },
      snippetTemplate: "Snippet template",
      travisCi: "Travis CI",
      type: {
        title: "Generator type",
        choices: ["simple", "composite"]
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
  preprompt() {
    var entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("desc");
    this.input("homepage");
    this.list("type");
    if (this.confirm({name: "snippet", default: false})) this.input("snippetTemplate");
    else this.confirm("checkDstDir");
    this.input("author");
    this.input("authorEmail");
    this.input("authorUrl");
    this.input("contributor");
    this.input("contributorEmail");
    this.input("contributorUrl");
    this.input("npmWho");
    if (this.input("gitUrl")) {
      const re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
      this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
      this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
    }
    this.input("bugsUrl");
    this.input("bugsEmail");
    this.list("linter");
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
    if (answers.linter == "JSHint") this.copy("_jshintrc", ".jshintrc");
    else if (answers.linter == "ESLint") this.copy("_eslintrc", ".eslintrc");
    this.copy("_travis.yml", ".travis.yml");
    this.template("_package.json", "package.json", answers);
    this.template("Justo.js", answers);
    this.template("README.md", answers);
    this.mkdir("template");
    if (answers.snippet) this.copy("template/snippets/snippet.hbs", answers.snippetTemplate + ".hbs");
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
