import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
})
export class YesNoDialogComponent {

  @Output() yes: EventEmitter<any> = new EventEmitter();
  @Output() no: EventEmitter<any> = new EventEmitter();
  @Input() title: string;
  @Input() message: string;
  @Input() data: any;
  @ViewChild('modal') modal: ElementRef;

  constructor() {
  }

  @Input()
  set show(show: boolean) {
    if (show) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    $(this.modal.nativeElement).modal('show');
  }

  close() {
    $(this.modal.nativeElement).modal('hide');

  }

  onYes() {
    this.yes.emit(this.data);
  }

  onNo() {
    this.no.emit(this.data);
  }

}
