import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { UserTypes } from '../models/usertypes.model';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  responseDisplay: string ='';
  userData: any;
  fieldTextType: boolean;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
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
        this.userData = response.data
        this.navigateToUserPage()
    });

  }

  onSignUp(){
    this.router.navigateByUrl('/signup');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  navigateToUserPage(){
    if( this.userData.userType == UserTypes.Doctor){
      this.router.navigate(['/doctor', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    } else if(this.userData.userType == UserTypes.Nurse){
      this.router.navigate(['/nurse', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    } else if (this.userData.userType == UserTypes.Patient){
      this.router.navigate(['/patient', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    }
  }

}


