import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

import { Employee } from '../Models/IEmployee';

@Injectable()
export class EmployeeService {

  domain: string = 'http://localhost:8080';
  employee: any;

  constructor(private http: Http) { }

  saveEmployee(employee) {
    return this.http.post(this.domain + '/employee/saveemployee', employee)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAllEmployees() {
    return this.http.get(this.domain + '/employee/allemployees')
      .map(res => res.json())
      .catch(this.handleError);
  }

  getEmployeeById(id: Number) {
    return this.http.get(this.domain + `/employee/${id}`)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  updateEmployee(id: Number, employee) {
    return this.http.put(this.domain + `/employee/${id}`, employee)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.domain + `/employee/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
