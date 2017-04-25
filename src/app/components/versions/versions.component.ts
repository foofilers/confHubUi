import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VersionService} from "../../services/version.service";
import {ErrorService} from "../../services/error.service";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs";
import {Router} from '@angular/router';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
})
export class VersionsComponent implements OnInit, OnDestroy {


  private subscriptions: Subscription[] = [];
  private currApplication: any;
  private defaultVersion: string;

  versions: any;
  newVersion: string;
  filterVersion: string;
  currCompare: string;
  private parentRouter: any;

  constructor(private cdRef: ChangeDetectorRef, private versionService: VersionService, private errorService: ErrorService, private router:Router) {
  }

  ngOnInit(): void {
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

  compare(version: string) {
    if (this.currCompare == null) {
      this.currCompare = version;
    } else {
      if (this.currCompare == version) {
        this.currCompare = null;
      } else {
        //compare
        this.router.navigate(['applications', this.currApplication.name, this.currCompare, 'compare', version]);
      }
    }
  }


  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
