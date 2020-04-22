import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlasterDashboardComponent } from './klaster-dashboard.component';

describe('KlasterDashboardComponent', () => {
  let component: KlasterDashboardComponent;
  let fixture: ComponentFixture<KlasterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlasterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
