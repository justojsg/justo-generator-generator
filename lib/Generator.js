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
      author: {
        title: "Author name",
        required: true
      },
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
      jsSpec: {
        title: "JavaScript spec to use",
        options: ["ES2015", "ES2016", "ES2017"],
        default: "ES2015"
      },
      linter: {
        title: "Code linter",
        options: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
      name: {
        title: "Generator package name",
        default: path.basename(process.cwd())
      },
      npmWho: "NPM username",
      snippet: {
        title: "Default generator is snippet generator?",
        type: "boolean",
        default: false
      },
      snippetTemplate: "Snippet template",
      travisCi: "Travis CI",
      type: {
        title: "Generator type",
        options: ["simple", "composite"]
      }
    };
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
    this.input("name");
    this.input("desc");
    this.input("homepage");
    this.select("type");
    if (this.confirm({name: "snippet", default: false})) this.input("snippetTemplate");
    else this.confirm("checkDstDir");
    this.input("author");
    this.input("authorEmail");
    this.input("authorUrl");
    if (this.input("contributor")) {
      this.input("contributorEmail");
      this.input("contributorUrl");
    }
    this.input("npmWho");
    if (this.input("gitUrl")) {
      const re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
      this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
      this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
    }
    this.input("bugsUrl");
    this.input("bugsEmail");
    this.select("jsSpec");
    this.select("linter");
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
    this.mkdir("dist");
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
