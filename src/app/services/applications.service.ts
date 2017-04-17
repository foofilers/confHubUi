import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {AuthHttp} from "angular2-jwt";
import {Headers} from "@angular/http";
import {ErrorService} from "./error.service";

@Injectable()
export class ApplicationsService {

  constructor(private http: AuthHttp) {
  }

  listApplications() {
    return this.http.get(environment.apiUrl + "apps/")
      .map(res => res.json());

  }

  get(name: any) {
    return this.http.get(environment.apiUrl + "apps/" + name)
      .map(res => res.json())
      .catch(ErrorService.handleError);
  }

  addApplication(app: any) {
    console.log("addApplication", app);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "name=" + app.name;
    return this.http.post(environment.apiUrl + "apps", body, {headers: headers})
      .catch(ErrorService.handleError);
  }


  delete(name: string) {
    return this.http.delete(environment.apiUrl + "apps/" + name)
      .catch(ErrorService.handleError);
  }


}
