import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { SignUpValidator } from '../../validators/sign-up.validator';

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
      phone: [user.mobilePhone, [SignUpValidator.phoneValidator]],
      email: [user.email, [SignUpValidator.emailValidator]],
      password: [user.password, [SignUpValidator.passwordValidator]],
      repeatPassword: [user.password, [SignUpValidator.passwordValidator]]
    });
  }

  onSubmit() {
    let isRightRepeatPass = this.registrationService.checkRightRepeatPass(this.signUpForm.controls);
    
    if (!isRightRepeatPass) {
      this.signUpForm.controls['repeatPassword'].setErrors({ 'repeatPassword' : true });
    } else {
      this.registrationService.setUserSignUpFields(this.signUpForm.controls)
      this.registrationService.changePage();
    }
  }

}
