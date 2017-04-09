import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {LocalStorageService} from "angular-2-local-storage";
import {JwtHelper} from "angular2-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  private username: string = null;
  private password: string = null;
  private userLogged: any = null;
  private jwtHelper = new JwtHelper();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    var token = localStorage.getItem("token");
    if (token) {
      this.userLogged = this.jwtHelper.decodeToken(token);
    }
  }

  isLogged(): boolean {
    return this.userLogged != null;
  }

  onLogin() {
    this.authService.login(this.username, this.password)
      .subscribe(res => {
          if (res.status == 200) {
            localStorage.setItem("token", res.text());
            this.userLogged = this.jwtHelper.decodeToken(res.text());
          }
        }
      );
  }

  onLogout() {
    this.userLogged = null;
    localStorage.removeItem("token");
  }
}
