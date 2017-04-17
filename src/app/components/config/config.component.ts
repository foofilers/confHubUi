import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {ConfigService} from "../../services/config.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {Subscription} from "rxjs";

@Component({
  selector: '[app-config]',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit, OnDestroy {

  @Output() deleted: EventEmitter<string> = new EventEmitter();
  @Output() edited: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<string> = new EventEmitter();
  private subscriptions: Subscription[] = [];



  propName: string;
  origPropName: string;
  propValue: string;
  private appName: string;
  private appVersion: string;
  editing: boolean;

  constructor(private errorService: ErrorService, private router: ActivatedRoute, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.router.params.subscribe(params => {
      this.appName = params['appName'];
      this.appVersion = params['version'];
    }));
  }

  @Input()
  set config(config: any) {
    this.origPropName = config.key;
    this.propName = config.key;
    this.propValue = config.value;
  }

  selConfig(){
    this.selected.emit(this.propName);
  }

  save() {
    this.subscriptions.push(this.configService.putOrUpdateConfig(this.appName, this.appVersion, this.origPropName, this.propName, this.propValue)
      .subscribe(
        () => {
          this.editing = false;
          this.edited.emit(this.propName);
        },
        error => this.errorService.showError("Error editing property", error)));
  }

  delete() {
    this.subscriptions.push(this.configService.delete(this.appName, this.appVersion, this.propName)
      .subscribe(() => {
          this.editing = false;
          this.deleted.emit(this.propName)
        },
        error => this.errorService.showError("Error editing property", error)));
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
