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

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationService.completedSignUp$.subscribe((data: boolean) => {
      this.completedSignUp = data;
    });
  }

}
