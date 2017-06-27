import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

import { Employee } from '../../Models/IEmployee';


@Component({
  selector: 'app-get-employees',
  templateUrl: './get-employees.component.html',
  styleUrls: ['./get-employees.component.css']
})
export class GetEmployeesComponent implements OnInit {

  employees: Employee[];
  employee: Employee;
  messageClass;
  message;
  processing: boolean = false;

  constructor(private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    return this.employeeService.getAllEmployees().subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.employees = data.message;
        //this.messageClass = 'alert alert-success';
        //this.message = 'Employees Returned successfully';
      }
    });
  }

  viewEmployee(employee: any) {
    this.router.navigate(['/viewemployee/' + employee._id]);
  }

  updateEmployee(employee: any) {
    this.router.navigate(['/updateemployee/' + employee._id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Do you want to delete employee?')) {
      return this.employeeService.deleteEmployee(id).subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
    } else {
      return false;
    }
  }

  addEmployee() {
    this.router.navigate(['/addemployee']);
  }

}
