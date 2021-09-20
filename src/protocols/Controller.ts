import { HttpRequest, HttpResponse } from "./Http";

interface Controller {
  handle(httpRequest: HttpRequest): HttpResponse;
}

export default Controller;
