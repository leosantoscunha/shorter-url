import { HttpRequest, HttpResponse } from "./Http";

interface Controller {
  encode(httpRequest: HttpRequest): HttpResponse;
  decode(httpRequest: HttpRequest): HttpResponse;
}

export default Controller;
