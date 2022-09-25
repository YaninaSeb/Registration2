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
    repeatPassword: ''
  };

  completedSignUp$$ = new BehaviorSubject<boolean>(false);

  completedSignUp$ = this.completedSignUp$$.asObservable();

  constructor() {}

  changePage() {
    let data = !this.completedSignUp$$.value;
    this.completedSignUp$$.next(data);
  }

}
