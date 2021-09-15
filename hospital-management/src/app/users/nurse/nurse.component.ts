import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Patient } from '../../shared/models/patient.model';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
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
  nurseName: string = '';
  successfullAddition: boolean = false;
  recordFound: boolean = true;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.nurseName = params.name;
      }
    )
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
      ])
    })
    this.editPatientForm = new FormGroup({
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
      createdby: new FormControl(this.complaint, [
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
    axios.post('https://localhost:44347/doctor/getPatient', params, { headers })
      .then(response => {
        if(response.data != ''){
          this.recordFound = true;
          this.patientInfo = response.data;
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
    this.editPatientForm.get('createdby').setValue(this.patientInfo.createdby);
  }

  onSavePatient(){
    this.successfullAddition = false;
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
    axios.put('https://localhost:44347/nurse/updatePatient', params, {headers})
      .then(response => {
        console.log(response)
    });
    this.editPatientForm.reset();
  }

  deletePatient(){
    this.successfullAddition = false;
    this.selectedOption = "delete";
    axios.delete('https://localhost:44347/nurse/deletePatient', {
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
    axios.get('https://localhost:44347/nurse/getPatientList')
      .then(response => {
        this.patientList = response.data
    });
  }

  onSubmit(){
    this.successfullAddition = false;
    const params = { 
      name: this.addPatientForm.get('name').value,
      ssn: this.addPatientForm.get('ssn').value,
      email: this.addPatientForm.get('email').value,
      password: this.addPatientForm.get('password').value, 
      complaint: this.addPatientForm.get('complaint').value,
      userType: 3
    };
    const headers = { 
      'Content-Type':'application/json'
    };
    axios.post('https://localhost:44347/nurse/createpatient', params, { headers })
      .then(response => {
        console.log(response)
        this.successfullAddition = false;
      });
    this.addPatientForm.reset();
  }
}
