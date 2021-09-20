export class ShorterURL {
  static encode(urlOriginal: string): string {
    let url = urlOriginal;

    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++)
      url += possible.charAt(Math.floor(Math.random() * possible.length));
    return url;
  }
}
