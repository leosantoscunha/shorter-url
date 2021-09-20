import { URLRepository } from "./URLRepository";
import { Url } from "../dtos/Url"
export class InMemory implements URLRepository {
  private urlList: Array<Url> = [];

  store(urlOriginal: string, newUrl: string): Promise<Url[] | null> {
    this.urlList.push({ urlOriginal, newUrl });
    return Promise.resolve(this.urlList);
  }

  get(urlOr: string): Promise<string | null> {
    const url = this.urlList.find(({ urlOriginal }) => urlOriginal === urlOr);
    return Promise.resolve(url !== undefined ? url.newUrl : null);
  }
}
