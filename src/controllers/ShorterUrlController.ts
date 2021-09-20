/* eslint-disable class-methods-use-this */
import { ShorterURL } from "../utils/ShorterURL";
import { HttpRequest, HttpResponse } from "../protocols/Http";
import { URLValidator } from "../protocols/URLValidator";
import { MissingParamError } from "../errors/MissingParamError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { fail, success } from "../helpers/Http-helper";
import { URLRepository } from "../database/URLRepository"
import Controller from "../protocols/Controller";

export class ShorterUrlController implements Controller {
  private readonly urlValidator: URLValidator;

  private readonly urlRepository: URLRepository;

  constructor(urlValidator: URLValidator, urlRepository: URLRepository) {
    this.urlValidator = urlValidator;
    this.urlRepository = urlRepository;
  }

  decode(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return fail(new MissingParamError("url"));
    }

    const isValid = this.urlValidator.isValid(httpRequest.body.url);
    if (!isValid) {
      return fail(new InvalidParamError("url"));
    }

    const url = this.urlRepository.get(
      httpRequest.body.url,
    );

    return success({ url });
  }

  // eslint-disable-next-line class-methods-use-this
  encode(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.url) {
      return fail(new MissingParamError("url"));
    }

    const isValid = this.urlValidator.isValid(httpRequest.body.url);
    if (!isValid) {
      return fail(new InvalidParamError("url"));
    }
    
    const url = this.urlRepository.store(
      httpRequest.body.url,
      ShorterURL.getNewUrl()
    );

    return success({ url: url.newUrl });
  }

  // redirect(httpRequest: any): any {
  //   const { code } = httpRequest.params;

  //   httpRequest.redirect(url);
  // }
}
