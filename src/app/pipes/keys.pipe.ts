import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    if (!isNullOrUndefined(value)) {
      for (let key in value) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
