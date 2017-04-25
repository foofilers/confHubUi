import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../../services/config.service";
import {ErrorService} from "../../services/error.service";
import 'rxjs/Rx' ;
declare var $: any;
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-view-configs',
  templateUrl: './view-configs.component.html',
  styleUrls: ['./view-configs.component.css']
})
export class ViewConfigsComponent implements OnInit, OnDestroy, AfterContentInit {

  private subscriptions: Subscription[] = [];
  private appName: string;
  private version: string;
  private config: any;

  constructor(private router: ActivatedRoute, private configService: ConfigService, private errorService: ErrorService) {
  }


  ngOnInit() {
    this.subscriptions.push(this.router.params.subscribe(params => {
      this.appName = params['appName'];
      this.version = params['version'];
      this.refresh();
    }));
  }

  ngAfterContentInit(): void {
    $('.ui.dropdown').dropdown();
  }

  refresh() {
    this.subscriptions.push(this.configService.getFormattedConfig(this.appName, this.version, "json").subscribe(
      conf => this.config = conf,
      error => this.errorService.showError("Error Getting formatted configuration", error)
    ));
  }

  downloadConfig(format: string) {
    this.subscriptions.push(this.configService.getFormattedConfig(this.appName, this.version, format).subscribe(
      conf => {
        var mimeType: string;
        var extension: string;
        switch (format) {
          case "json":
          case "flatJson": {
            mimeType = "application/json";
            extension = "json";
            break
          }
          case "xml":
          case "flatXml": {
            mimeType = "application/xml";
            extension = "xml";
            break
          }
          case "yaml": {
            mimeType = "application/yaml";
            extension = "yaml";
            break
          }
          case "properties": {
            mimeType = "text/plain";
            extension = "properties";
            break
          }
          default: {
            mimeType = "text/plain";
            extension = "txt";
            break
          }
        }
        var blob = new Blob([conf], {type: mimeType});
        FileSaver.saveAs(blob, this.appName + "_" + this.version + "." + extension);
      },
      error => this.errorService.showError("Error downloading formatted configuration", error)
    ));
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
