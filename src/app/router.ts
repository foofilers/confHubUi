import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ApplicationsComponent} from "./components/applications/applications.component";
import {ApplicationComponent} from "./components/application/application.component";
import {VersionsComponent} from "./components/versions/versions.component";
import {ConfigsComponent} from "./components/configs/configs.component";
export const AppRoutes: Routes = [
  {path: "",  pathMatch: 'full',redirectTo:"applications"},
  {path: "applications", component: ApplicationsComponent},
  {path: "applications/:appName", component: ApplicationComponent},
  {path: "applications/:appName/:version", component: ConfigsComponent}
]

