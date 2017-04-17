import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VersionService} from "../../services/version.service";
import {ErrorService} from "../../services/error.service";
import {isNullOrUndefined, isUndefined} from "util";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
})
export class VersionsComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  private currApplication: any;
  private defaultVersion: string;

  versions: any;
  newVersion: string;
  filterVersion: string;

  constructor(private cdRef: ChangeDetectorRef, private versionService: VersionService, private errorService: ErrorService) {
  }

  @Input()
  set application(app: any) {
    console.log("set app", app);
    this.currApplication = app;
    this.refresh();
  }

  refresh() {
    console.log("refresh versions");
    if (!isNullOrUndefined(this.currApplication)) {
      this.subscriptions.push(this.versionService.listVersions(this.currApplication.name)
        .subscribe(vers => {
            this.versions = vers.versions;
            this.defaultVersion = vers.defaultVersion;
            this.cdRef.detectChanges();
          },
          error => this.errorService.showError("Error retrieving versions", error)));
    }
  }

  addVersion() {
    this.subscriptions.push(this.versionService.add(this.currApplication.name, this.newVersion)
      .subscribe(
        () => this.refresh(),
        error => this.errorService.showError("Error adding a new version", error)));
  }


  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
