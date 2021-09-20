/* eslint-disable class-methods-use-this */
import { ShorterURL } from "../utils/ShorterURL";
import { HttpRequest, HttpResponse } from "../protocols/Http";
import { URLValidator } from "../protocols/URLValidator";
import { MissingParamError } from "../errors/MissingParamError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { fail, success } from "../helpers/Http-helper";
import { URLRepository } from "../database/URLRepository"
import Controller from "../protocols/Controller";
import { InMemory } from "../database/InMemory";

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

  public async redirect(req: any, res:any) {
    const {code} = req.params
    
    if (!code) {
      return fail(new MissingParamError("code"));
    }

    const domain = 'http://localhost:3333/'
    const url = this.urlRepository.get(
      domain + code,
    );
    console.log('urlRepository: ', url)
    // const isValid = this.urlValidator.isValid(url||'');
    // if (!isValid) {
    //   return fail(new InvalidParamError("url"));
    // }
    
    return res.redirect(300, domain);
  }
}
