import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../environments/environment";
import {ErrorService} from "./error.service";
import {Headers} from "@angular/http";

@Injectable()
export class VersionService {

  constructor(private http: AuthHttp) {
  }

  listVersions(appName: string) {
    return this.http.get(environment.apiUrl + "versions/" + appName)
      .map(res => res.json())
      .catch(ErrorService.handleError);
  }

  add(appName, newVersion: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "version=" + newVersion;
    return this.http.post(environment.apiUrl + "versions/" + appName, body, {headers: headers})
      .map(res => res)
      .catch(ErrorService.handleError);
  }

  delete(appName, version: string) {
    return this.http.delete(environment.apiUrl + "versions/" + appName + "/" + version)
      .map(res => res)
      .catch(ErrorService.handleError);
  }

  setDefaultVersion(appName, version: string) {
    return this.http.put(environment.apiUrl + "versions/" + appName + "/" + version, null)
      .map(res => res)
      .catch(ErrorService.handleError);
  }

  copy(appName,srcVersion, destVersion: string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "version=" + destVersion;
    return this.http.put(environment.apiUrl + "versions/" + appName + "/" + srcVersion+"/copy", body, {headers: headers})
      .map(res => res)
      .catch(ErrorService.handleError);
  }

}
