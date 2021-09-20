const domail = 'http://localhost:3333/'

export class ShorterURL {
  static getNewUrl(): string {
    return `${domail}${this.genarateCode()}`
  }

  static genarateCode () {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}
