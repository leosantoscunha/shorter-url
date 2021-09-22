import { Repository } from "./Repository";
import { Url } from "../dtos/Url"
export class InMemory implements Repository {
  private urlList: Array<Url> = [];

  store(urlOriginal: string, newUrl: string): Url {
    this.urlList.push({ urlOriginal, newUrl });
    return {
      urlOriginal: urlOriginal,
      newUrl: newUrl
    };
  }

  get(urlOr: string): string | null {
    const url = this.urlList.find(({ newUrl }) => {
      return newUrl === urlOr
    });
    return url !== undefined ? url.urlOriginal : null;
  }
  
}
