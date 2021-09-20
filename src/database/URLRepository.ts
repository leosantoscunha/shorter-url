import { Url } from "../dtos/Url"

export interface URLRepository {
  store(urlOriginal: string, newUrl: string): Url;
  get(urlOriginal: string): string | null;
}
