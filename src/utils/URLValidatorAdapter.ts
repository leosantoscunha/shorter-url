/* eslint-disable class-methods-use-this */
import { URLValidator } from "../protocols/URLValidator";

export class URLValidatorAdapter implements URLValidator {
  isValid(url: string): boolean {
    try {
      new URL(url);
    } catch (e) {
      // console.error(url);
      // console.error(e);
      return false;
    }
    return true;
  }
}
