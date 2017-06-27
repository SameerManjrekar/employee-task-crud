import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './services/employee.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from './Models/IEmployee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
  constructor( ) { }

  ngOnInit() {

  }  
}


