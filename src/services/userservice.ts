import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
//import { AuthenticationService } from '../_services/index';
import { User } from '../model/user';
import { AuthProvider } from "../providers/auth/auth";

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private readonly authProvider: AuthProvider,) {
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authProvider.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('url-api, options)
            .map((response: Response) => response.json());
    }
}
