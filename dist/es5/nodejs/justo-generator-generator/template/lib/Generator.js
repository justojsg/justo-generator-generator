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
    {{#if scope.snippet}}
    super(Object.assign({}, opts, {mute: true}), responses);
    {{else}}
    super(opts, responses);
    {{/if}}
  }

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
