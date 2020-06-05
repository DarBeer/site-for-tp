import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditDashboardComponent } from './service-edit-dashboard.component';

describe('ServiceEditDashboardComponent', () => {
  let component: ServiceEditDashboardComponent;
  let fixture: ComponentFixture<ServiceEditDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
