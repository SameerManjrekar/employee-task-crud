import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployeesComponent } from './get-employees.component';

describe('GetEmployeesComponent', () => {
  let component: GetEmployeesComponent;
  let fixture: ComponentFixture<GetEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
