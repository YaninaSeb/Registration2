import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../../assets/schema.json'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = {
    mobilePhone: '',
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    sex: '',
    birthday: ''
  };

  completedSignUp$$ = new BehaviorSubject<boolean>(false);

  completedSignUp$ = this.completedSignUp$$.asObservable();

  constructor() {}

  getBirthday (controls: any) {
    let dayBirthday = controls['dayBirthday'].value;
    let monthBirthday = controls['monthBirthday'].value;
    let yearBirthday = controls['yearBirthday'].value;
    let res = new Date(yearBirthday, monthBirthday-1, dayBirthday)
    return res.toLocaleString("en", { day: 'numeric', month: 'long', year: 'numeric' })
  }

  changePage() {
    let data = !this.completedSignUp$$.value;
    this.completedSignUp$$.next(data);
  }

}
