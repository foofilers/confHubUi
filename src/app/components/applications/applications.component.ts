import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {ApplicationsService} from "../../services/applications.service";
import {ErrorService} from "../../services/error.service";
import "rxjs/add/operator/catch";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
})
export class ApplicationsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private applications: any[];
  private openDelete: boolean;
  private deleteTitle: string;
  private deleteMessage: string;
  private appToDelete: any;
  private appToDeleteConfirm: string;
  filterApplication:string;

  private newApp: any = {
    name: null
  };

  constructor(private cdRef: ChangeDetectorRef, private applicationsService: ApplicationsService, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    console.log("refresh applications");
    this.applicationsService.listApplications()
      .subscribe(
        res => {
          this.applications = res;
          this.cdRef.detectChanges();
        },
        error => this.errorService.showError("Error retrieving application list", error)
      );
  }

  addApplication() {
    this.subscriptions.push(this.applicationsService.addApplication(this.newApp)
      .subscribe(
        data => this.refresh(),
        error => this.errorService.showError("Error adding application", error)
      ));
  }

  deleteApplication(app: any) {
    this.appToDelete = app;
    this.deleteTitle = "Delete " + app.name;
    this.deleteMessage = "Are you sure to delete the application? write the application name to delete it:[" + app.name + "]";
    this.appToDeleteConfirm = app.name;
    this.openDelete = true;
  }

  confirmAppDelete(appToDelete: any) {
    this.subscriptions.push(this.applicationsService.delete(appToDelete.name)
      .subscribe(
        () => this.refresh(),
        error => this.errorService.showError("Error deleting application", error)));
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }
}
