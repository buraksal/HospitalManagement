import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnInit {

  loggedInUser: any;

  constructor() { }

  ngOnInit(): void {
  }

  getLoggedInUser(){
    return this.loggedInUser;
  }

  setLoggedInUser(user: any){
    this.loggedInUser = user;
  }

}
