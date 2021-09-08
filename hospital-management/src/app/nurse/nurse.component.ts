import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  userType: string = 'Nurse';

  constructor() { }

  ngOnInit(): void {
  }

}
