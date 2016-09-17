//import
{{#if scope.checkDstDir}}
import * as fs from "justo-fs";
{{/if}}
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  {{#if scope.snippet}}
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(Object.assign({}, opts, {mute: true}), responses);
  }

  {{/if}}
  /**
   * @override
   */
  get desc() {
    return "{{{scope.desc}}}";
  }

  /**
   * @override
   */
  get params() {
    return {};
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
    {{#if scope.checkDstDir}}
    var entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
    {{/if}}
  }

  /**
   * @override
   */
  prompt(answers) {

  }

  /**
   * @override
   */
  pregenerate(answers) {

  }

  /**
   * @override
   */
  generate(answers) {
    {{#if scope.snippet}}
    return this.templateAsString("snippets/{{scope.snippetTemplate}}.hbs", answers);
    {{/if}}
  }
}
