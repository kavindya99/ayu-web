import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRegistrationRequestsComponent } from './doctor-registration-requests.component';

describe('DoctorRegistrationRequestsComponent', () => {
  let component: DoctorRegistrationRequestsComponent;
  let fixture: ComponentFixture<DoctorRegistrationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorRegistrationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRegistrationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
