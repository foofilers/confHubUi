import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationsService} from "../../services/applications.service";
import {ErrorService} from "../../services/error.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  application: any;
  private appName: string;
  private sub: any;

  constructor(private cdRef: ChangeDetectorRef, private router: ActivatedRoute, private errorService: ErrorService, private applicationsService: ApplicationsService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.router.params.subscribe(params => {
      console.log("params", params);
      this.appName = params['appName'];
      this.refresh();
    }));
  }

  refresh() {
    this.subscriptions.push(this.applicationsService.get(this.appName).subscribe(
      (app) => {
        this.application = app;
        this.cdRef.detectChanges();
      }, error => this.errorService.showError("Error adding application", error)));

  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }
}
