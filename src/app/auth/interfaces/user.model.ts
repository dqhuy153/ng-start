export type UserProps = {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: Date;
};

export class User {
  public email: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(user: UserProps) {
    this.email = user.email;
    this.id = user.id;
    this._token = user._token;
    this._tokenExpirationDate = user._tokenExpirationDate;
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) return null;

    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}
