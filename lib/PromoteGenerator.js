//imports
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * @override
   */
  get desc() {
    return "Promote the index.js file from simple to composite.";
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
  prompt(answers) {

  }

  /**
   * @override
   */
  generate(answers) {
    this.copy("index.composite.js", "index.js");
  }
}
