import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './users/admin/admin.component';
import { DoctorComponent } from './users/doctor/doctor.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './utilities/components/login/login.component';
import { NurseComponent } from './users/nurse/nurse.component';
import { PatientComponent } from './users/patient/patient.component';
import { SignupComponent } from './utilities/components/signup/signup.component';
import { AuthGuardService } from './utilities/services/auth-guard/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'admin', component: AdminComponent,
    children: [{
      path:':id',
      component: AdminComponent
    }]
  },
  {path: 'patient', component: PatientComponent,
    children: [{
      path: ':id',
      component: PatientComponent
    }]
  , canActivate: [AuthGuardService]},
  {path: 'nurse', component: NurseComponent,
    children: [{
      path: ':id',
      component: NurseComponent
    }]
  , canActivate: [AuthGuardService]},
  {path: 'doctor', component: DoctorComponent,
    children: [{
      path: ':id',
      component: DoctorComponent
    }]
  , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
