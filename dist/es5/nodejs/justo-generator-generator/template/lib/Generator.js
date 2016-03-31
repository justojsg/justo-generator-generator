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
    return "{{scope.desc}}";
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
    if ((new fs.Dir(this.dst)).hasEntries()) return "Destination dir is not empty.";
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

  }
}
