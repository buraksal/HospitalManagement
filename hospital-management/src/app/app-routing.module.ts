import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NurseComponent } from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';
import { SignupComponent } from './signup/signup.component';

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
