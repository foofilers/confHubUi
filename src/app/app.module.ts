import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AuthService} from "./services/auth.service";
import {AppRoutes} from "./router";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import {AuthModule} from "./authModule/auth.module";
import {LocalStorageModule} from "angular-2-local-storage";
import {ApplicationsComponent} from './components/applications/applications.component';
import {ApplicationsService} from "./services/applications.service";
import { ApplicationComponent } from './components/application/application.component';
import {ErrorService} from "./services/error.service";
import {ErrorMessageComponent} from "./components/error-message/error-message.component";
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationsComponent,
    ApplicationComponent,
    ErrorMessageComponent,
    YesNoDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    LocalStorageModule.withConfig({
      prefix: 'confHub',
      storageType: 'localStorage'
    }),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [AuthService, ApplicationsService,ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
