import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationsService} from "../../services/applications.service";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit,OnDestroy {

  private application: any={};
  private appName:string;
  private sub: any;

  constructor(private router: ActivatedRoute, private applicationsService: ApplicationsService) {
  }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.appName=params['appName'];
      this.refresh();
    })
  }

  refresh(){
    this.applicationsService.get(this.appName).then(res => {console.log(res);this.application = res;});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
