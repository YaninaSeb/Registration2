import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    password: ''
  };

  completedSignUp$$ = new BehaviorSubject<boolean>(false);

  completedSignUp$ = this.completedSignUp$$.asObservable();


  completedPersonalInfo$$ = new BehaviorSubject<boolean>(false);

  completedPersonalInfo$ = this.completedPersonalInfo$$.asObservable();

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

  showFullInfo() {
    this.completedPersonalInfo$$.next(true);
  }

}
