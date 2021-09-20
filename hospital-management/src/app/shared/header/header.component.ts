import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userType: string ='Default User';
  @Input() userName: string = 'Name';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigateByUrl("/");
  }
}