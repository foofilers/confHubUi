import {Routes} from "@angular/router";
import {ApplicationsComponent} from "./components/applications/applications.component";
import {ApplicationComponent} from "./components/application/application.component";
import {EditConfigsComponent} from "./components/edit-configs/edit-configs.component";
import {ViewConfigsComponent} from "./components/view-configs/view-configs.component";
import {CompareConfigsComponent} from "./components/compare-configs/compare-configs.component";
export const AppRoutes: Routes = [
  {path: "",  pathMatch: 'full',redirectTo:"applications"},
  {path: "applications", component: ApplicationsComponent},
  {path: "applications/:appName", component: ApplicationComponent},
  {path: "applications/:appName/:version/edit", component: EditConfigsComponent},
  {path: "applications/:appName/:version/view", component: ViewConfigsComponent},
  {path: "applications/:appName/:fromVersion/compare/:toVersion", component: CompareConfigsComponent}
]

