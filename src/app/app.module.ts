import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    MdbCheckboxModule,
    MdbFormsModule,
    MdbModalModule,
    MdbRadioModule,
    MdbValidationModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
