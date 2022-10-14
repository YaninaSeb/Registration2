import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as data from '../../../assets/schema.json';
import { IUserSchema } from '../models/user.model';

export class SignUpValidator {

  static schema: IUserSchema = data;

  static phoneAndMailValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let field = this.schema[controlName as keyof IUserSchema] as any;
      let isRequired = field.required;
      let re = new RegExp(field.regExp);

      if (isRequired && !re.test(control.value) ) {
        return { controlName : true };
      } else if (!isRequired && control.value.length > 0 && !re.test(control.value)) {
        return { controlName : true };
      }
      return null;
    }
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
