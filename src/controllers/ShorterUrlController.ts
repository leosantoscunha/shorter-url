import { HttpRequest, HttpResponse } from "../protocols/Http";
import { URLValidator } from "../protocols/URLValidator";
import { MissingParamError } from "../errors/MissingParamError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { fail, success } from "../helpers/Http-helper";
import Controller from "../protocols/Controller";

export class ShorterUrlController implements Controller {
  private readonly urlValidator: URLValidator;

  constructor(urlValidator: URLValidator) {
    this.urlValidator = urlValidator;
  }

  // eslint-disable-next-line class-methods-use-this
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return fail(new MissingParamError("url"));
    }

    const isValid = this.urlValidator.isValid(httpRequest.body.url);
    if (!isValid) {
      return fail(new InvalidParamError("url"));
    }

    return success({});
  }
}
