import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SignUpInfoFormComponent } from './components/sign-up-info-form/sign-up-info-form.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FullInfoComponent } from './components/full-info/full-info.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    RegistrationComponent,
    SignUpInfoFormComponent,
    PersonalInfoFormComponent,
    FullInfoComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class AuthModule { }
