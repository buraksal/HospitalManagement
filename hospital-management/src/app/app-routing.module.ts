import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './users/admin/admin.component';
import { AppComponent } from './app.component';
import { DoctorComponent } from './users/doctor/doctor.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './utilities/login/login.component';
import { NurseComponent } from './users/nurse/nurse.component';
import { PatientComponent } from './users/patient/patient.component';
import { SignupComponent } from './utilities/signup/signup.component';

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
  },
  {path: 'nurse', component: NurseComponent,
    children: [{
      path: ':id',
      component: NurseComponent
    }]
  },
  {path: 'doctor', component: DoctorComponent,
    children: [{
      path: ':id',
      component: DoctorComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
