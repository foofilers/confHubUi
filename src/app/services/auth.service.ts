import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from "../../environments/environment";
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor(private http: Http, private localStorage: LocalStorageService) {
  }

  login(username, password: string) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "username=" + username + "&password=" + password;
    return this.http.post(environment.apiUrl + "auth/login", body, {headers: headers});
  }

}
