import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-safe-dialog',
  templateUrl: './safe-dialog.component.html',
})
export class SafeDialogComponent implements OnInit {

  @Output() yes: EventEmitter<any> = new EventEmitter();
  @Output() no: EventEmitter<any> = new EventEmitter();
  @Input() title: string;
  @Input() message: string;
  @Input() data: any;
  @Input("safe-message") safeMessage:string;
  @ViewChild('modal') modal: ElementRef;

  private confirm: string;
  constructor() { }

  ngOnInit() {
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
