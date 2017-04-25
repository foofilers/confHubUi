import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {ConfigService} from "../../services/config.service";
import {Subscription} from "rxjs";
declare var $: any;

@Component({
  selector: 'app-edit-configs',
  templateUrl: './edit-configs.component.html',
})
export class EditConfigsComponent implements OnInit, OnDestroy {


  private configSelected: Set<string> = new Set();

  private subscriptions: Subscription[] = [];
  configs: any;
  appName: string;
  version: string;
  newProp: string;
  newValue: string;
  filterProp: string;
  filterValue: string;

  constructor(private router: ActivatedRoute, private configService: ConfigService, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.router.params.subscribe(params => {
      this.appName = params['appName'];
      this.version = params['version'];
      this.refresh();
    }));
  }



  refresh() {
    console.log("Loading configuration for", this.appName, this.version);
    this.subscriptions.push(this.configService.getConfig(this.appName, this.version)
    .subscribe(
      confs => this.configs = confs,
      error => this.errorService.showError("Error retrieving configurations", error)));
  }

  addProperty() {
    this.subscriptions.push(this.configService.putConfig(this.appName, this.version, this.newProp, this.newValue)
    .subscribe(() => this.refresh(),
      error => this.errorService.showError("Error adding configuration", error)));
  }

  selConfig(propName: string) {
    if (this.configSelected.has(propName)) {
      this.configSelected.delete(propName);
    } else {
      this.configSelected.add(propName);
    }
    console.log(this.configSelected);
  }

  deleteSelected() {
    this.configSelected.forEach(cnfSel => {
      console.log(cnfSel);
      this.configService.delete(this.appName, this.version, cnfSel).toPromise();
    });
    this.refresh();
    this.configSelected.clear();
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
