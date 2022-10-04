import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import * as data from '../../../../assets/schema.json'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FullInfoComponent } from '../full-info/full-info.component';
import { PersonalInfoValidator } from '../../validators/personal-info.validator';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {

  personalInfoForm!: FormGroup;

  hobbiesList!: string[];

  selectedHobbies: string[] = [];

  oceansList!: string[];

  modalRef: MdbModalRef<FullInfoComponent> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [PersonalInfoValidator.firstNameValidator]],
      lastName: ['', [PersonalInfoValidator.lastNameValidator]],
      gender: ['', [PersonalInfoValidator.genderValidator]],
      dayBirthday: ['', [PersonalInfoValidator.dayBirthdayValidator]],
      monthBirthday: ['', [PersonalInfoValidator.monthBirthdayValidator]],
      yearBirthday: ['', [PersonalInfoValidator.yearBirthdayValidator]],
      ocean: ['', []],
      hobby: ['', [PersonalInfoValidator.hobbyValidator.bind(this.registrationService)]]
    });

    this.hobbiesList = this.registrationService.getHobbies();
    this.oceansList = this.registrationService.getOceans();
  }

  onSelectHobby(hobby: string) {
    this.registrationService.setSelectedHobbiesList(hobby);
  }

  backToSignUp() {
    this.registrationService.changePage();
  }

  openFullInfo() {
    this.modalRef = this.modalService.open(FullInfoComponent);
  }

  onSubmit() {
    this.registrationService.setUserPersonalFields(this.personalInfoForm.controls);
    this.openFullInfo();
  }

}
