import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from '../../Models/IEmployee';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  updateEmployeemployeeForm: FormGroup;
  employee: Employee;
  emp: any;
  messageClass;
  message;
  processing: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params !== undefined) {
        if (params['id'] !== undefined) {
          let id = +params['id'];
          this.viewEmployee(params['id']);
        }
      }
    });

  }

  createForm() {
    this.updateEmployeemployeeForm = this.formBuilder.group({
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

  viewEmployee(id: number) {
    return this.employeeService.getEmployeeById(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.employee = data.message[0];
        // Update Data on the form
        this.updateEmployeemployeeForm.patchValue({
          firstname: this.employee.firstname,
          lastname: this.employee.lastname,
          password: this.employee.password,
          dob: this.employee.dob,
          city: this.employee.city,
          userType: this.employee.userType,
          userStatus: this.employee.userStatus
        });
      }
    });
  }

  onEmployeeUpdateSubmit() {
    this.emp = this.employee;
    let employee = {
      firstname: this.updateEmployeemployeeForm.get('firstname').value,
      lastname: this.updateEmployeemployeeForm.get('lastname').value,
      password: this.updateEmployeemployeeForm.get('password').value,
      dob: this.updateEmployeemployeeForm.get('dob').value,
      city: this.updateEmployeemployeeForm.get('city').value,
      userType: this.updateEmployeemployeeForm.get('userType').value,
      userStatus: this.updateEmployeemployeeForm.get('userStatus').value
    };

    return this.employeeService.updateEmployee(this.emp._id, employee).subscribe(data => {
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

  goBack() {
    this.router.navigate(['/']);
  }

}
