import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationFormVerificationComponent } from './examination-form-verification.component';

describe('ExaminationFormVerificationComponent', () => {
  let component: ExaminationFormVerificationComponent;
  let fixture: ComponentFixture<ExaminationFormVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationFormVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationFormVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
