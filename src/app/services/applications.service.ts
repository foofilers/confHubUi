import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {AuthHttp} from "angular2-jwt";
import {Headers} from "@angular/http";

@Injectable()
export class ApplicationsService {

  constructor(private http: AuthHttp) {
  }

  listApplications() {
    return this.http.get(environment.apiUrl + "apps/")
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  get(name: any) {
    return this.http.get(environment.apiUrl + "apps/" + name)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  addApplication(app: any) {
    console.log("addApplication", app);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = "name=" + app.name;
    return this.http.post(environment.apiUrl + "apps", body, {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error("An error occured on ApplicationsService", error);
    return Promise.reject(error.message || error);
  }


}
