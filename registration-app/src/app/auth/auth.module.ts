import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignUpInfoComponent } from './pages/sign-up-info/sign-up-info.component';
import { SignUpInfoFormComponent } from './components/sign-up-info-form/sign-up-info-form.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

const routes: Routes = [
  { path: '', component: SignUpInfoComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    SignUpInfoComponent,
    SignUpInfoFormComponent,
    PersonalInfoFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
