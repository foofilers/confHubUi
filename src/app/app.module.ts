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
import {ApplicationComponent} from './components/application/application.component';
import {ErrorService} from "./services/error.service";
import {ErrorMessageComponent} from "./components/error-message/error-message.component";
import {YesNoDialogComponent} from './components/yes-no-dialog/yes-no-dialog.component';
import {ConfigService} from "./services/config.service";
import {VersionService} from "./services/version.service";
import { VersionsComponent } from './components/versions/versions.component';
import { ConfigsComponent } from './components/configs/configs.component';
import { ConfigComponent } from './components/config/config.component';
import { KeysPipe } from './pipes/keys.pipe';
import { SafeDialogComponent } from './components/safe-dialog/safe-dialog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { VersionComponent } from './components/version/version.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationsComponent,
    ApplicationComponent,
    ErrorMessageComponent,
    YesNoDialogComponent,
    VersionsComponent,
    ConfigsComponent,
    ConfigComponent,
    KeysPipe,
    SafeDialogComponent,
    BreadcrumbComponent,
    FilterByPipe,
    VersionComponent

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
  providers: [AuthService, ApplicationsService, ErrorService, ConfigService, VersionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
