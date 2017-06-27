import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AppComponent } from './app.component';
import { GetEmployeesComponent } from './components/get-employees/get-employees.component';

const routes: Routes = [
  { path: '', component: GetEmployeesComponent },  
  { path: 'addemployee', component: AddEmployeeComponent },
  { path: 'viewemployee/:id', component: ViewEmployeeComponent },
  { path: 'updateemployee/:id', component: UpdateEmployeeComponent },
  { path: '**', component: GetEmployeesComponent }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    bootstrap: [],
    providers: [],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }