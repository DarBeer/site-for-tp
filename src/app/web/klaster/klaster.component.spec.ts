import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlasterComponent } from './klaster.component';

describe('KlasterComponent', () => {
  let component: KlasterComponent;
  let fixture: ComponentFixture<KlasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
