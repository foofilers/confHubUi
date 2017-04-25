import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {VersionService} from "../../services/version.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: '[app-version]',
  templateUrl: './version.component.html',
})
export class VersionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  @Input() application: string;
  @Input() version: string;
  @Input() defaultVersion: string;
  @Input() currCompare: string;
  @Output() defaultVersionChange: EventEmitter<string> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  @Output() copied: EventEmitter<string> = new EventEmitter();
  @Output() compared: EventEmitter<string> = new EventEmitter();


  verToDelete: string;
  deleteTitle: string;
  deleteMessage: string;
  verToDeleteConfirm: string;
  openDelete: boolean;

  copying: boolean = false;
  destCopyVersion: string;

  constructor(private versionService: VersionService, private errorService: ErrorService) {
  }

  ngOnInit() {
  }

  isDefaultVersion(ver: string): boolean {
    return this.defaultVersion == this.version;
  }

  setDefaultVersion() {
    this.subscriptions.push(this.versionService.setDefaultVersion(this.application, this.version)
    .subscribe(() => this.defaultVersionChange.emit(this.version),
      error => this.errorService.showError("Error setting default version", error)));
  }

  deleteVersion() {
    this.verToDelete = this.version;
    this.deleteTitle = "Delete version " + this.version;
    this.deleteMessage = "Are you sure to delete the version? write the application name to delete it:[" + this.version + "]";
    this.verToDeleteConfirm = this.version;
    this.openDelete = true;
  }

  confirmVerDelete() {
    this.subscriptions.push(this.versionService.delete(this.application, this.version)
    .subscribe(() => this.deleted.emit(this.version),
      error => this.errorService.showError("Error deleting application", error)));
  }

  copy() {
    this.subscriptions.push(this.versionService.copy(this.application, this.version, this.destCopyVersion)
    .subscribe(
      () => this.copied.emit(this.destCopyVersion),
      error => this.errorService.showError("Error copying version", error)
    ));
  }

  compare() {
    this.compared.emit(this.version);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

}
