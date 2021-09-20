import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';

import { AdminComponent } from './users/admin/admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { PatientComponent } from './users/patient/patient.component';
import { NurseComponent } from './users/nurse/nurse.component';
import { DoctorComponent } from './users/doctor/doctor.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './utilities/components/login/login.component';
import { SignupComponent } from './utilities/components/signup/signup.component';


export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    HeaderComponent,
    PatientComponent,
    NurseComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44349"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
