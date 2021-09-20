import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    axios.post('https://localhost:44349/login/signin', params, { headers })
      .then(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        // this.userData = response
        // console.log(response)
        // console.log(this.userData.data)
        // this.navigateToUserPage()
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

  navigateToUserPage(){
    console.log(this.userData.data.userType + " " + UserTypes.Doctor);
    this.createUser(this.userData.data);
    if( this.loggedInUser.userType == UserTypes.Doctor){
      console.log(this.loggedInUser);
      this.router.navigate(['/doctor', this.userData.data.id], {queryParams: 
        {name: this.userData.data.name}
      });
    } else if(this.loggedInUser.userType == UserTypes.Nurse){

      this.router.navigate(['/nurse', this.userData.data.id], {queryParams: 
        {name: this.userData.data.name}
      });
    } else if (this.loggedInUser.userType == UserTypes.Patient){

      this.router.navigate(['/patient', this.userData.data.id], {queryParams: 
        {name: this.userData.data.name}
      });
    }
  }

  createUser(data: any){
    if(data.userType == UserTypes.Doctor){
      this.loginSevice.setLoggedInUser(this.CreateDoctor(data));
    } else if(data.userType == UserTypes.Nurse) {
      this.loginSevice.setLoggedInUser(this.CreateNurse(data));
    } else if(data.userType == UserTypes.Patient) {
      this.loginSevice.setLoggedInUser(this.CreatePatient(data));
    }
  }

  CreateDoctor(data){
    this.loggedInUser = new Doctor(UserTypes.Doctor,
      data.name,
      data.email,
      data.password,
      data.ssn
    )
  }

  CreateNurse(data){
    this.loggedInUser = new Nurse(UserTypes.Nurse,
      data.name,
      data.email,
      data.password,
      data.ssn
    )
  }

  CreatePatient(data){
    this.loggedInUser = new Patient(UserTypes.Patient,
      data.name,
      data.email,
      data.password,
      data.ssn,
      data.complaint,
      data.createdBy
    )
  }

}


