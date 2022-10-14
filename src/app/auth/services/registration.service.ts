import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as data from '../../../assets/schema.json';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user: IUser = {
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

  getHobbiesTitle(controls: any) {
    let arrHobbyFlags = controls['hobby'].value;
    let arrHobbyTitles = this.getHobbiesList();
    let res: string[] = [];

    arrHobbyFlags.forEach((item: any, ind: number) => {
      if (item == true) res.push(arrHobbyTitles[ind]);
    });

    return res.join(', ');
  }

  changePage() {
    let data = !this.completedSignUp$$.value;
    this.completedSignUp$$.next(data);
  }

  setUserSignUpFields(controls: any) {
    this.user.mobilePhone = controls['phone'].value;
    this.user.email = controls['email'].value;
    this.user.password = controls['password'].value;;
  }

  setUserPersonalFields(controls: any) {
    this.user.firstName = controls['firstName'].value;
    this.user.lastName = controls['lastName'].value;
    this.user.sex = controls['gender'].value;
    this.user.birthday = this.getBirthday(controls);
    this.user.hobby = this.getHobbiesTitle(controls);
  }

}
