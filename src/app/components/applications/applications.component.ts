import {Component, OnInit} from '@angular/core';
import {ApplicationsService} from "../../services/applications.service";

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

  constructor(private applicationsService: ApplicationsService) {
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
