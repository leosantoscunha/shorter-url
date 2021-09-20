interface IStore {
  store(key: string, value: string): Promise<string | null>;
  get(key: string): Promise<string | null>;
}