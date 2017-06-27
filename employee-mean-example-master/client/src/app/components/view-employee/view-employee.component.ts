import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
// import { FlashMessagesService } from 'angular2-flash-messages';

import { Employee } from '../../Models/IEmployee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee: Employee;
  messageClass;
  message;
  processing: boolean = false;

  constructor(private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params !== undefined) {
        if (params['id'] !== undefined) {
          let id = +params['id'];
          this.processing = true;
          this.viewEmployee(params['id']);
        }
      }
    });
  }

  viewEmployee(id: number) {
    return this.employeeService.getEmployeeById(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.employee = data.message[0];
        this.messageClass = 'alert alert-success';
        this.message = 'Employee data returned succesfully';
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
