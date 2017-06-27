import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/IEmployee';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employees: Employee[];
  employee: Employee;
  processing: boolean = false;
  messageClass;
  message;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.validateFirstname
      ])],
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.validateLastname
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.minLength(10),
        Validators.maxLength(40),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])],
      dob: [''],
      city: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateCity
      ])],
      userType: ['', Validators.compose([
        Validators.required
      ])],
      userStatus: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  validateEmail(control) {
    const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    if (emailRegex.test(control.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateFirstname(control) {
    const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
    if (nameRegex.test(control.value)) {
      return null;
    } else {
      return { 'validateFirstname': true }
    }
  }

  validateLastname(control) {
    const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
    if (nameRegex.test(control.value)) {
      return null;
    } else {
      return { 'validateLastname': true }
    }
  }

  validateCity(control) {
    const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
    if (nameRegex.test(control.value)) {
      return null;
    } else {
      return { 'validateCity': true }
    }
  }

  onEmployeeSubmit() {    
    const employee = {
      firstname: this.employeeForm.get('firstname').value,
      lastname: this.employeeForm.get('lastname').value,
      email: this.employeeForm.get('email').value,
      password: this.employeeForm.get('password').value,
      dob: this.employeeForm.get('dob').value,
      city: this.employeeForm.get('city').value,
      userType: this.employeeForm.get('userType').value,
      userStatus: this.employeeForm.get('userStatus').value
    };    

    return this.employeeService.saveEmployee(employee).subscribe(data => {
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

  }

}
