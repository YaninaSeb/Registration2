import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
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

  modalRef: MdbModalRef<FullInfoComponent> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', [PersonalInfoValidator.nameValidator('firstName')]],
      lastName: ['', [PersonalInfoValidator.nameValidator('lastName')]],
      sex: ['', [PersonalInfoValidator.genderValidator()]],
      birthday: this.formBuilder.group({
        dayBirthday: ['', [PersonalInfoValidator.birthdayValidator('dayBirthday')]],
        monthBirthday: ['', [PersonalInfoValidator.birthdayValidator('monthBirthday')]],
        yearBirthday: ['', [PersonalInfoValidator.birthdayValidator('yearBirthday')]],
      }),
      hobby: this.formBuilder.array([], [PersonalInfoValidator.hobbyValidator()])
    });

    this.hobbiesList = this.registrationService.getHobbiesList();
    this.setHobby();
  }

  get hobby() {
    return this.personalInfoForm.get('hobby') as FormArray;
  }

  get gender() {
    return this.personalInfoForm.get('sex') as FormArray;
  }

 setHobby() {
    this.hobbiesList.forEach((hobby, ind) => {
      this.hobby.push(this.formBuilder.control(hobby));
    })
  }

  setGender(data: string) {
    this.gender.setValue([data])
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
