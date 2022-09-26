import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-full-info',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.scss']
})
export class FullInfoComponent implements OnInit {

  userInfo!: any;

  constructor(
    private registrationService: RegistrationService,
    public modalRef: MdbModalRef<FullInfoComponent>
  ) { }

  ngOnInit(): void {
    this.userInfo =this.registrationService.user;
  }

}
