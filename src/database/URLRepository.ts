import { Url } from "../dtos/Url"

export interface URLRepository {
  store(urlOriginal: string, newUrl: string): Promise<Url[] | null>;
  get(urlOriginal: string): Promise<string | null>;
}
