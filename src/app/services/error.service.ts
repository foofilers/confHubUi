import {EventEmitter, Injectable} from '@angular/core';
import {Error} from "../commons/error";

@Injectable()
export class ErrorService {
  public error: EventEmitter<Error> = new EventEmitter();

  constructor() { }

  public showError(title,description:string){
    this.error.emit(new Error(title,description));
  }


  public static handleError(error: any): Promise<any> {
    console.error("An error occured", error);
    return Promise.reject(error.message || error);
  }
}
