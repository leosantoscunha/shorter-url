import { Url } from "../dtos/Url"

export interface Repository {
  urlList: Array<Url>
  store(urlOriginal: string, newUrl: string): Url;
  get(urlOriginal: string): string | null;
}
