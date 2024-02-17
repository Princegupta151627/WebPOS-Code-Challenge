import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterEnrollmentNewComponent } from './semester-enrollment-new.component';

describe('SemesterEnrollmentNewComponent', () => {
  let component: SemesterEnrollmentNewComponent;
  let fixture: ComponentFixture<SemesterEnrollmentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterEnrollmentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterEnrollmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
