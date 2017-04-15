import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ErrorService} from "../../services/error.service";
import {Error} from "../../commons/error";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',

})
export class ErrorMessageComponent implements OnInit {

  private topic: string;
  private description: string;
  private show: boolean;

  @Output() closedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private errorService: ErrorService) {
  }

  ngOnInit(): void {
    this.errorService.error.subscribe((error:Error) => {
      this.topic = error.title;
      this.description= error.description;
      this.show=true;
    })
  }

  hide(){
    this.show=false;
  }


}
