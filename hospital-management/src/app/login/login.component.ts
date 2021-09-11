import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { stringify } from 'querystring';

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
    axios.post('https://localhost:44347/login/signin', params, { headers })
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
    if( Number(this.userData.userType) == 1){
      this.router.navigate(['/doctor', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    } else if(Number(this.userData.userType) == 2){
      this.router.navigate(['/nurse', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    } else if (Number(this.userData.userType) == 3){
      this.router.navigate(['/patient', this.userData.id], {queryParams: 
        {name: this.userData.name}
      });
    }
  }

}


