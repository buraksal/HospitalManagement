import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  name: string = '';
  ssn: string = '';
  email: string = '';
  password: string = '';
  userTypeStr: string = 'Select User Type';
  userType: number = 0;
  fieldTextType: boolean;
  userTypeSelected: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      ssn: new FormControl(this.ssn, [
        Validators.required, 
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(6)
      ]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
    })
  }

  onSubmit(){
    if(this.userTypeStr == 'Select User Type'){
      this.userTypeSelected = false;
    } else {
      const params = { 
        name: this.signupForm.get('name').value,
        ssn: this.signupForm.get('ssn').value,
        email: this.signupForm.get('email').value,
        password: this.signupForm.get('password').value, 
        userType: this.userType
      };
      const headers = { 
        'Content-Type':'application/json'
      };
      let config = {
        params, headers 
      }
      axios.post('https://localhost:44347/signup/create', params, { headers })
        .then(response => console.log(response));
    }
    
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onPatient(){
    this.userTypeStr = "Patient";
    this.userType = 4;
    this.userTypeSelected = true;
  }
  onNurse(){
    this.userTypeStr = "Nurse";
    this.userType = 3;
    this.userTypeSelected = true;
  }
  onDoctor(){
    this.userTypeStr = "Doctor";
    this.userType = 2;
    this.userTypeSelected = true;
  }


}
