import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/models/patient.model';
import axios from 'axios';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/utilities/services/login-service/login-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  selectedOption: string = '';
  patientList: Patient[] = [];
  addPatientForm: FormGroup;
  editPatientForm: FormGroup;
  name: string = '';
  ssn: string = '';
  email: string = '';
  password: string = '';
  complaint: string = '';
  fieldTextType: boolean;
  patientInfo: Patient;
  patientSSN: string = '';
  docName: string = '';
  createdby: string = '';
  successfullAddition: boolean = false;
  recordFound: boolean = true;
  loggedInUser: any;

  constructor(public activatedRoute: ActivatedRoute,
              public loginService: LoginService,
              private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.loggedInUser = this.loginService.getLoggedInUser();
    this.addPatientForm = new FormGroup({
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
      complaint: new FormControl(this.complaint, [
        Validators.required,
        Validators.minLength(10)
      ]),
    })
    this.editPatientForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      ssn: new FormControl({value: this.ssn, disabled: true}),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      complaint: new FormControl(this.complaint, [
        Validators.required,
        Validators.minLength(10)
      ]),
      createdby: new FormControl(this.createdby, [
        Validators.required
      ])
    })
  }

  addPatient(){
    this.successfullAddition = false;
    this.selectedOption = "add";
  }

  editPatient(){
    this.successfullAddition = false;
    this.selectedOption = "edit";
  }

  searchPatient(){
    const params = { 
      ssn: this.patientSSN
    };
    const headers = { 
      'Content-Type':'application/json'
    };
    axios.post('https://localhost:44349/user/getPatient', params, { headers })
      .then(response => {
        if(response.data != ''){
          this.recordFound = true;
          this.patientInfo = response.data;
          console.log(this.patientInfo);
          this.selectedOption = "patientedit";
          this.fillEditForm();
        } else {
          this.recordFound = false;
        }
        
      });
  }

  fillEditForm(){
    this.editPatientForm.get('name').setValue(this.patientInfo.name);
    this.editPatientForm.get('ssn').setValue(this.patientInfo.ssn);
    this.editPatientForm.get('email').setValue(this.patientInfo.email);
    this.editPatientForm.get('password').setValue(this.patientInfo.password);
    this.editPatientForm.get('complaint').setValue(this.patientInfo.complaint);
    this.editPatientForm.get('createdby').setValue(this.patientInfo.createdBy);
  }

  onSavePatient(){
    
    const params = { 
      name: this.editPatientForm.get('name').value,
      ssn: this.editPatientForm.get('ssn').value,
      email: this.editPatientForm.get('email').value,
      password: this.editPatientForm.get('password').value, 
      complaint: this.editPatientForm.get('complaint').value,
      createdby: this.editPatientForm.get('createdby').value
    };
    const headers = { 
      'Content-Type':'application/json'
    };
    axios.put('https://localhost:44349/user/updatePatient', params, {headers})
      .then(response => {
        console.log(response)
      });
    this.editPatientForm.reset();
  }

  setSelectedOptionDelete(){
    this.successfullAddition = false;
    this.selectedOption = "delete";
  }

  deletePatient(){
    axios.delete('https://localhost:44349/user/deletePatient', {
      headers: {
        'Content-Type':'application/json'
      },
      data: {
        ssn: this.patientSSN
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  listPatient(){
    this.successfullAddition = false;
    this.selectedOption = "list";
    axios.get('https://localhost:44349/user/getPatientList')
      .then(response => {
        this.patientList = response.data
    });
  }

  onSubmit(){
    this.successfullAddition = false;
    console.log(this.loggedInUser);
    const params = { 
      name: this.addPatientForm.get('name').value,
      ssn: this.addPatientForm.get('ssn').value,
      email: this.addPatientForm.get('email').value,
      password: this.addPatientForm.get('password').value, 
      complaint: this.addPatientForm.get('complaint').value,
      createdby: this.loggedInUser.ssn,
    };
    const headers = { 
      'Content-Type':'application/json'
    };
    axios.post('https://localhost:44349/user/createpatient', params, { headers })
      .then(response => {
        console.log(response.status)
        if(response.status == 200){
          this.successfullAddition = true;
        }
      }).catch(error => {
        console.log(error.response)
    });
    this.addPatientForm.reset();  
  }

  isAuthenticated(){
    const token: string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)) return true;
    else return false;
  }
}
