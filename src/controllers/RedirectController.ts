import { HttpResponse } from "../protocols/Http";
import { URLValidator } from "../protocols/URLValidator";
import { MissingParamError } from "../errors/MissingParamError";
import { InvalidParamError } from "../errors/InvalidParamError";
import { fail, success } from "../helpers/Http-helper";
import { Repository } from "../database/Repository";
import { Controller } from "../protocols/Controller";

export class RedirectController implements Controller {
  private readonly urlValidator: URLValidator;

  private readonly urlRepository: Repository;

  constructor(urlValidator: URLValidator, urlRepository: Repository) {
    this.urlValidator = urlValidator;
    this.urlRepository = urlRepository;
  }

  async handle(request: any): Promise<HttpResponse> {
    const { code } = request.params;

    if (!code) {
      return fail(new MissingParamError("code"));
    }

    const domain = "http://localhost:3333/";

    const urlDecoded = this.urlRepository.get(domain + code);
    if (!urlDecoded) {
      return fail(new InvalidParamError("code"));
    }

    const isValid = this.urlValidator.isValid(urlDecoded);
    if (!isValid) {
      return fail(new InvalidParamError("code"));
    }

    return success({ url: urlDecoded });
  }
}
