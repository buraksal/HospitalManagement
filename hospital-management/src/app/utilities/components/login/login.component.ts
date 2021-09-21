import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios, { AxiosResponse } from 'axios';
import { Doctor } from 'src/app/shared/models/admin.model';
import { Nurse } from 'src/app/shared/models/nurse.model';
import { Patient } from 'src/app/shared/models/patient.model';
import { UserTypes } from 'src/app/shared/models/usertypes.model';
import { LoginService } from '../../services/login-service/login-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInUser: any
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  responseDisplay: string ='';
  userData: any;
  fieldTextType: boolean;
  invalidLogin: boolean;
  
  constructor(private router: Router,
              private loginSevice: LoginService) { }

  ngOnInit(): void {
    this.loggedInUser = this.loginSevice.getLoggedInUser();
    this.loginForm = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
    });
  }

  onSubmit() {
    const params = { 
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    const headers = { 
      'Content-Type':'application/json'
    };
    axios.post('https://localhost:44349/login/auth', params, { headers })
      .then(response => {
        const token = (<any>response).data;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.navigateToUserPage(token);
    }, err => {
      this.invalidLogin = true;
    });

  }

  onSignUp(){
    this.router.navigateByUrl('/signup');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  navigateToUserPage(token: any){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.createUser(decodedToken.User);
    this.loggedInUser = this.loginSevice.getLoggedInUser();
    if( this.loggedInUser.userType == UserTypes.Doctor){
      this.router.navigate(['/doctor', this.loggedInUser.name]);
    } else if(this.loggedInUser.userType == UserTypes.Nurse){
      this.router.navigate(['/nurse', this.loggedInUser.name]);
    } else if (this.loggedInUser.userType == UserTypes.Patient){
      this.router.navigate(['/patient', this.loggedInUser.name]);
    }
  }

  createUser(data: any){
    if(data.UserType == UserTypes.Doctor){
      this.loginSevice.setLoggedInUser(this.CreateDoctor(data));
    } else if(data.UserType == UserTypes.Nurse) {
      this.loginSevice.setLoggedInUser(this.CreateNurse(data));
    } else if(data.UserType == UserTypes.Patient) {
      this.loginSevice.setLoggedInUser(this.CreatePatient(data));
    }
  }

  CreateDoctor(data): Doctor{
    return new Doctor(UserTypes.Doctor,
      data.Name,
      data.Email,
      data.Password,
      data.Ssn
    );
  }

  CreateNurse(data): Nurse{
    return new Nurse(UserTypes.Nurse,
      data.Name,
      data.Email,
      data.Password,
      data.Ssn
    )
  }

  CreatePatient(data): Patient{
    return new Patient(UserTypes.Patient,
      data.Name,
      data.Email,
      data.Password,
      data.Ssn,
      data.Complaint,
      data.CreatedBy
    )
  }

}


