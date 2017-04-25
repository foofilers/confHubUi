import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../environments/environment";
import {ErrorService} from "./error.service";
import {Headers} from "@angular/http";
import {isNullOrUndefined} from "util";

@Injectable()
export class ConfigService {

  constructor(private http: AuthHttp) {
  }

  getConfig(appName, version: string) {
    return this.http.get(environment.apiUrl + "configs/" + appName + "/" + version + "?reference=false")
    .map(res => res.json())
    .catch(ErrorService.handleError);
  }

  getFormattedConfig(appName, version, format: string) {
    return this.http.get(environment.apiUrl + "configs/" + appName + "/" + version + "?reference=true&format=" + format)
    .map(res => res.text())
    .catch(ErrorService.handleError);
  }

  putConfig(appName: string, version: string, prop: string, value: string) {
    return this.putOrUpdateConfig(appName, version, prop, null, value);
  }

  putOrUpdateConfig(appName: string, version: string, origProp, newProp: string, value: string) {
    console.log("putConfig " + appName + "-" + version + "-" + origProp + "/" + newProp + "=" + value);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "value=" + value;
    if (!isNullOrUndefined(newProp)) {
      body += "&key=" + newProp;
    }
    return this.http.put(environment.apiUrl + "values/" + appName + "/" + version + "/" + origProp, body, {headers: headers})
    .map(res => res.json())
    .catch(ErrorService.handleError);
  }

  delete(appName, version, prop: string) {
    console.log("Delete prop" + appName + "-" + version + "-" + prop);
    return this.http.delete(environment.apiUrl + "values/" + appName + "/" + version + "/" + prop)
    .map(res => res.json())
    .catch(ErrorService.handleError);
  }


}
