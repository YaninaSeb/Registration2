import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as data from '../../../../assets/schema.json'
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-sign-up-info-form',
  templateUrl: './sign-up-info-form.component.html',
  styleUrls: ['./sign-up-info-form.component.scss']
})
export class SignUpInfoFormComponent implements OnInit {
  
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    let user = this.registrationService.user;
    
    this.signUpForm = this.formBuilder.group({
      phone: [user.mobilePhone, [this.phoneValidator]],
      email: [user.email, [this.emailValidator]],
      password: [user.password, [this.passwordValidator]],
      repeatPassword: [user.password, [this.passwordValidator]]
    });
  }

  phoneValidator(control: FormControl): { [key: string]:boolean } | null {
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

  emailValidator(control: FormControl): { [key: string]:boolean } | null {
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

  passwordValidator(control: FormControl): { [key: string]:boolean } | null {
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

  onSubmit() {
    let isRightRepeatPass = this.registrationService.checkRightRepeatPass(this.signUpForm.controls);
    
    if (!isRightRepeatPass) {
      this.signUpForm.controls['repeatPassword'].setErrors({ 'repeatPassword' : true });
    } else {
      this.registrationService.user.mobilePhone = this.signUpForm.controls['phone'].value;
      this.registrationService.user.email = this.signUpForm.controls['email'].value;
      this.registrationService.user.password = this.signUpForm.controls['password'].value;;
      
      this.registrationService.changePage();
    }
  }

}