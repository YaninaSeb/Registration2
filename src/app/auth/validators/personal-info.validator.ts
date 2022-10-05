import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import * as data from '../../../assets/schema.json';

export class PersonalInfoValidator {

  static firstNameValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.firstName.required;
    let minLength = schema.firstName.minLength;
    let maxLength = schema.firstName.maxLength;
    let len = control.value.length;

    if (isRequired && (len < minLength || len > maxLength)) {
      return { 'firstName' : true };
    } else if (!isRequired && len > 0 && (len < minLength || len > maxLength)) {
      return { 'firstName' : true };
    }
    return null;
  }

  static lastNameValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.lastName.required;
    let minLength = schema.lastName.minLength;
    let maxLength = schema.lastName.maxLength;
    let len = control.value.length;

    if (isRequired && (len < minLength || len > maxLength)) {
      return { 'lastName' : true };
    } else if (!isRequired && len > 0 && (len < minLength || len > maxLength)) {
      return { 'lastName' : true };
    }
    return null;
  }

  static genderValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.sex.required;
    
    if (isRequired && control.value == '') {
      return { 'lastName' : true };
    } 
    return null;
  }

  static dayBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.birthday.required;
    let len = control.value.length;

    if (isRequired && len != 2) {
      return { 'dayBirthday' : true };
    } 
    else if (isRequired && len == 2 && (control.value > 31 || control.value < 1)) {
      return { 'dayBirthday' : true };
    } 
    if (!isRequired && (len == 1 || len > 2)) {
      return { 'dayBirthday' : true };
    } 
    else if (!isRequired && len == 2 && (control.value > 31 || control.value < 1)) {
      return { 'dayBirthday' : true };
    }
    return null;
  }

  static monthBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.birthday.required;
    let len = control.value.length;

    if (isRequired && len != 2) {
      return { 'monthBirthday' : true };
    } 
    else if (isRequired && len == 2 && (control.value > 12 || control.value < 1)) {
      return { 'monthBirthday' : true };
    } 
    if (!isRequired && (len == 1 || len > 2)) {
      return { 'monthBirthday' : true };
    } 
    else if (!isRequired && len == 2 && (control.value > 12 || control.value < 1)) {
      return { 'monthBirthday' : true };
    }
    return null;
  }

  static yearBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.birthday.required;
    let maxYear = new Date().getFullYear() - +schema.birthday.minAge;
    let minYear = new Date().getFullYear() - +schema.birthday.maxAge;

    let len = control.value.length;

    if (isRequired && len != 4) {
      return { 'yearBirthday' : true };
    } 
    else if (isRequired && len == 4 && (control.value > maxYear || control.value < minYear)) {
      return { 'yearBirthday' : true };
    } 
    if (!isRequired && (len == 1 || (len > 1 && len != 4))) {
      return { 'yearBirthday' : true };
    } 
    else if (!isRequired && len == 4 && (control.value > maxYear || control.value < minYear)) {
      return { 'yearBirthday' : true };
    }
    return null;
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
