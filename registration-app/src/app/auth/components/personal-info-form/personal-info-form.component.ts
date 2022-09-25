import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import * as data from '../../../../assets/schema.json'

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  personalInfoForm!: FormGroup;

  schema!: {};

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [this.firstNameValidator]],
      lastName: ['', [this.lastNameValidator]],
      gender: ['', [Validators.required]],
      dayBirthday: ['', []],
      monthBirthday: ['', []],
      yearBirthday: ['', []],
      ocean: ['', []],
      hobby: ['', []]
    });
  }

  get _gender() {
    return this.personalInfoForm.controls['gender'] as FormControl;
  }

  firstNameValidator(control: FormControl): { [key: string]:boolean } | null {
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

  lastNameValidator(control: FormControl): { [key: string]:boolean } | null {
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

  genderValidator(control: FormControl): { [key: string]:boolean } | null {
    let schema = data;
    let isRequired = schema.sex.required;
    
    if (isRequired && !control.value) {
      return { 'lastName' : true };
    } 
    return null;
  }

  backToSignUp() {
    this.registrationService.changePage();
  }

  onSubmit() {}

}
