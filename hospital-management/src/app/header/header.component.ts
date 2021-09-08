import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userType: string ='Default User';
  @Input() userName: string = 'Name';

  constructor() { }

  ngOnInit(): void {
  }

}
