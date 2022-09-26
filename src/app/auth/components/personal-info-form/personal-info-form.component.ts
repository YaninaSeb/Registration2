import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import * as data from '../../../../assets/schema.json'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FullInfoComponent } from '../full-info/full-info.component';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  personalInfoForm!: FormGroup;

  schema!: {};

  modalRef: MdbModalRef<FullInfoComponent> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [this.firstNameValidator]],
      lastName: ['', [this.lastNameValidator]],
      gender: ['', [this.genderValidator]],
      dayBirthday: ['', [this.dayBirthdayValidator]],
      monthBirthday: ['', [this.monthBirthdayValidator]],
      yearBirthday: ['', [this.yearBirthdayValidator]],
      // ocean: ['', []],
      // hobby: ['', []]
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
    
    if (isRequired && control.value == '') {
      return { 'lastName' : true };
    } 
    return null;
  }

  dayBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
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

  monthBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
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

  yearBirthdayValidator(control: FormControl): { [key: string]:boolean } | null {
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

  backToSignUp() {
    this.registrationService.changePage();
  }

   openFullInfo() {
    this.modalRef = this.modalService.open(FullInfoComponent);
   }

  onSubmit() {
    this.registrationService.user.firstName = this.personalInfoForm.controls['firstName'].value;
    this.registrationService.user.lastName = this.personalInfoForm.controls['lastName'].value;
    this.registrationService.user.sex = this.personalInfoForm.controls['gender'].value;
    this.registrationService.user.birthday = this.registrationService.getBirthday(this.personalInfoForm.controls);

    this.openFullInfo();
  }

}
