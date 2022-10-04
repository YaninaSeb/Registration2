import { FormControl } from '@angular/forms';
import * as data from '../../../assets/schema.json';

export class SignUpValidator {

  static phoneValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.mobilePhone.required;
    let re = new RegExp(schema.mobilePhone.regExp);
    if (isRequired && !re.test(control.value) ) {
      return { 'phone' : true };
    } else if (!isRequired && control.value.length > 0 && !re.test(control.value)) {
      return { 'phone' : true };
    }
    return null;
  }

  static emailValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.email.required;
    let re = new RegExp(schema.email.regExp);
    if (isRequired && !re.test(control.value) ) {
      return { 'email' : true };
    } else if (!isRequired && control.value.length > 0 && !re.test(control.value)) {
      return { 'email' : true };
    }
    return null;
  }
    
  static passwordValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.password.required;
    let minLength = schema.password.minLength;
    let maxLength = schema.password.maxLength;
    let len = control.value.length;
    if (isRequired && (len < minLength || len > maxLength)) {
      return { 'password' : true };
    } else if (!isRequired && len > 0 && (len < minLength || len > maxLength)) {
      return { 'password' : true };
    }
    return null;
  }

}
