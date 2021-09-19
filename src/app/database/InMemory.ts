class InMemory implements IStore {
  
  store(key: string, value: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  get(key: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }

}