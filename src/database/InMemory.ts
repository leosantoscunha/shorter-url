import { Repository } from "./Repository";
import { Url } from "../dtos/Url"
export class InMemory implements Repository {
  urlList: Array<Url> = [];
  private static instance: InMemory;

  public static getInstance(): InMemory {

    if (!InMemory.instance) {
      InMemory.instance = new InMemory();
    }

    return InMemory.instance;
  }

  store(urlOriginal: string, newUrl: string): Url {
    const url = this.get(urlOriginal)
    if (url) {
      return {
        urlOriginal: urlOriginal,
        newUrl: url
      };
    };
    
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
