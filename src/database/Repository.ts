import { Url } from "../dtos/Url"

export interface Repository {
  store(urlOriginal: string, newUrl: string): Url;
  get(urlOriginal: string): string | null;
}
