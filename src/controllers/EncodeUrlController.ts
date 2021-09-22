/* eslint-disable class-methods-use-this */
import { ShorterURL } from "../utils/ShorterURL";
import { HttpRequest, HttpResponse } from "../protocols/Http";
import { URLValidator } from "../protocols/URLValidator";
import { MissingParamError } from "../errors/MissingParamError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { fail, success } from "../helpers/Http-helper";
import { Repository } from "../database/Repository"
import {Controller} from "../protocols/Controller";

export namespace EncodeUrlController {
  export type Request = {
    url: string
  }
}
export class EncodeUrlController implements Controller {
  private readonly urlValidator: URLValidator;

  private readonly urlRepository: Repository;

  constructor(urlValidator: URLValidator, urlRepository: Repository) {
    this.urlValidator = urlValidator;
    this.urlRepository = urlRepository;
  }
  
  async handle(request: any): Promise<HttpResponse> {
    if (!request.body.url) {
      return fail(new MissingParamError("url"));
    }

    const isValid = this.urlValidator.isValid(request.body.url);
    if (!isValid) {
      return fail(new InvalidParamError("url"));
    }
    
    const url = this.urlRepository.store(
      request.body.url,
      ShorterURL.getNewUrl()
    );

    return success({ url: url.newUrl });
  }

  
  // public async redirect(req: any, res:any) {
  //   const {code} = req.params
    
  //   if (!code) {
  //     return fail(new MissingParamError("code"));
  //   }

  //   const domain = 'http://localhost:3333/'
  //   const url = this.urlRepository.get(
  //     domain + code,
  //   );
  //   console.log('urlRepository: ', url)
  //   // const isValid = this.urlValidator.isValid(url||'');
  //   // if (!isValid) {
  //   //   return fail(new InvalidParamError("url"));
  //   // }
    
  //   return res.redirect(300, domain);
  // }
}
