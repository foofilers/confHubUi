import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApplicationsService} from "../../services/applications.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  private applications ;
  private newApp: any = {
    name: null
  };

  constructor(private applicationsService: ApplicationsService, private errorService:ErrorService) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.applicationsService.listApplications().then(apps =>{console.log(apps);this.applications=apps });
  }

  addApplication() {
    this.applicationsService.addApplication(this.newApp).then(() => this.refresh());
  }

}
