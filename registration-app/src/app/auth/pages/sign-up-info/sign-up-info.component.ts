import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-sign-up-info',
  templateUrl: './sign-up-info.component.html',
  styleUrls: ['./sign-up-info.component.scss']
})
export class SignUpInfoComponent implements OnInit {

  completedSignUp!:boolean;

  private completedSignUpSubscription!: Subscription;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.completedSignUpSubscription = this.registrationService.completedSignUp$.subscribe((data: boolean) => {
      this.completedSignUp = data;
    });  
  }

}
