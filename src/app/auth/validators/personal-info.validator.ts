import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as data from '../../../assets/schema.json';
import { IUserSchema } from '../models/user.model';

export class PersonalInfoValidator {
  static schema: IUserSchema = data;

  static nameValidator(name: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let field = this.schema[name as keyof IUserSchema] as any;
      let isRequired = field.required;
      let minLength = field.minLength;
      let maxLength = field.maxLength;
      let len = control.value.length;
  
      if (isRequired && (len < minLength || len > maxLength)) {
        return { name : true };
      }
      if (!isRequired && len > 0 && (len < minLength || len > maxLength)) {
        return { name : true };
      }
      return null;
    };
  }

  static genderValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.sex.required;
    
    if (isRequired && control.touched != true) {
      return { 'gender' : true };
    } 
    return null;
  }

  static birthdayValidator(name: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isRequired = this.schema.birthday.required;
      let currLen = control.value.length;
      let len = name == 'yearBirthday' ? 4 : 2;
      let minValue = 1;
      let maxValue = name == 'dayBirthday' ? 31 : 12;

      if (name == 'yearBirthday') {
        maxValue = new Date().getFullYear() - +this.schema.birthday.minAge;
        minValue = new Date().getFullYear() - +this.schema.birthday.maxAge;
      }

      if (isRequired && (currLen != len || control.value > maxValue || control.value < minValue)) {
        return { name : true };
      }
      if (!isRequired && (currLen != 0 && currLen != len)) {
        return { name : true };
      } else if (!isRequired && (currLen == len && (control.value > maxValue || control.value < minValue))) {
        return { name : true };
      } 
    
      return null;
    };
  }

  static hobbyValidator(control: AbstractControl): ValidationErrors | null  {
    let schema = data;
    let isRequired = schema.hobby.required;

    if (isRequired && control.value.length == 0) {
      return { 'hobby' : true };
    } 

    return null
  }

}
