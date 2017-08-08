import {tokenNotExpired} from 'angular2-jwt';

export class Auth {
  constructor() {}

  public static authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }
}