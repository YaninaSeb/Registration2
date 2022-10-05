import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../../assets/schema.json'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = {
    firstName: '',
    lastName: '',
    birthday: '',
    sex: '',
    mobilePhone: '',
    email: '',
    password: '',
    hobby: ''
  };

  completedSignUp$$ = new BehaviorSubject<boolean>(false);

  completedSignUp$ = this.completedSignUp$$.asObservable();

  constructor() {}

  checkRightRepeatPass(controls: any) {
    let password = controls['password'].value;
    let repeatPassword = controls['repeatPassword'].value;
    return password == repeatPassword;
  }

  getBirthday (controls: any) {
    let dayBirthday = controls['birthday'].controls['dayBirthday'].value;
    let monthBirthday = controls['birthday'].controls['monthBirthday'].value;
    let yearBirthday = controls['birthday'].controls['yearBirthday'].value;
    let res = new Date(yearBirthday, monthBirthday-1, dayBirthday)
    return res.toLocaleString("en", { day: 'numeric', month: 'long', year: 'numeric' })
  }

  getHobbiesList() {
    let schema = data;
    let hobbies = schema.hobby.anyOf;
    return hobbies;
  }

  changePage() {
    let data = !this.completedSignUp$$.value;
    this.completedSignUp$$.next(data);
  }

  setUserPersonalFields(controls: any) {
    this.user.firstName = controls['firstName'].value;
    this.user.lastName = controls['lastName'].value;
    this.user.sex = controls['gender'].value;
    this.user.birthday = this.getBirthday(controls);
    this.user.hobby = controls['hobby'].value;
  }

}
