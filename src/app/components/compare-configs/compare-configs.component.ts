import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ErrorService} from "../../services/error.service";
import {ConfigService} from "../../services/config.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-compare-configs',
  templateUrl: './compare-configs.component.html',
  styleUrls: ['./compare-configs.component.css']
})
export class CompareConfigsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private appName: string;
  private fromVersion: string;
  private toVersion: string;
  fromConfig: string="";
  toConfig: string="";

  constructor(private router: ActivatedRoute, private configService: ConfigService, private errorService: ErrorService,private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subscriptions.push(this.router.params.subscribe(params => {
      this.appName = params['appName'];
      this.fromVersion = params['fromVersion'];
      this.toVersion = params['toVersion'];
      this.getConfigurationAndCompare();
    }));
  }

  private getConfigurationAndCompare() {
    this.subscriptions.push(this.configService.getFormattedConfig(this.appName, this.fromVersion, "json").subscribe(
      conf1 => {
        this.fromConfig = conf1;
        this.compare()
      },
      error => this.errorService.showError("Error getting configuration for version" + this.fromVersion, error)
    ));
    this.subscriptions.push(this.configService.getFormattedConfig(this.appName, this.toVersion, "json").subscribe(
      conf2 => {
        this.toConfig = conf2;
        this.compare()
      },
      error => this.errorService.showError("Error getting configuration for version" + this.toVersion, error)
    ));
  }

  private compare() {
    if (!isNullOrUndefined(this.fromConfig) && !isNullOrUndefined(this.toConfig)){
      //real compare the two configuration
      console.log(this.fromConfig);
      console.log(this.toConfig);
      this.cdRef.detectChanges()
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
