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

  selectedHobbies: string[] = [];

  constructor() {}

  checkRightRepeatPass(controls: any) {
    let password = controls['password'].value;
    let repeatPassword = controls['repeatPassword'].value;
    return password == repeatPassword;
  }

  getBirthday (controls: any) {
    let dayBirthday = controls['dayBirthday'].value;
    let monthBirthday = controls['monthBirthday'].value;
    let yearBirthday = controls['yearBirthday'].value;
    let res = new Date(yearBirthday, monthBirthday-1, dayBirthday)
    return res.toLocaleString("en", { day: 'numeric', month: 'long', year: 'numeric' })
  }

  getHobbies() {
    let schema = data;
    let hobbies = schema.hobby.anyOf;
    return hobbies;
  }

  getOceans() {
    let schema = data;
    let oceans = schema.ocean.oneOf;
    return oceans;
  }

  setSelectedHobbiesList(item: string) {
    let ind = this.selectedHobbies.indexOf(item);
    if (ind != -1) { 
      this.selectedHobbies.splice(ind, 1);
    } else {
      this.selectedHobbies.push(item);
    }
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
    console.log(controls['hobby'])
    this.user.hobby = this.selectedHobbies.join(', ');
  }

}
