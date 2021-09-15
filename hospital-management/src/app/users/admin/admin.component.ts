import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userType: string = 'Admin';
  userList: any;
  constructor() { }

  ngOnInit(): void {
  }

  listUser(){
    axios.get('https://localhost:44347/admin/getUserList')
      .then(response => {
        this.userList = response.data
    });
  }

}
