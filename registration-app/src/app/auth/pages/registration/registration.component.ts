import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  completedSignUp!:boolean;

  completedPersonalInfo!: boolean;

  private completedSignUpSubscription!: Subscription;

  private completedPersonalInfoSubscription!: Subscription;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.completedSignUpSubscription = this.registrationService.completedSignUp$.subscribe((data: boolean) => {
      this.completedSignUp = data;
    });

    this.completedPersonalInfoSubscription = this.registrationService.completedPersonalInfo$.subscribe((data: boolean) => {
      this.completedPersonalInfo = data;
    });
  }

}
