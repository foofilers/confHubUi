import {Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {ApplicationsComponent} from "./components/applications/applications.component";
import {ApplicationComponent} from "./components/application/application.component";
export const AppRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "applications", component: ApplicationsComponent},
  {path: "applications/:appName", component: ApplicationComponent}
]

