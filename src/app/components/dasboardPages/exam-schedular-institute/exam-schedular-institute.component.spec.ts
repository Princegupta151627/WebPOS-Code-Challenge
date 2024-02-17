import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSchedularInstituteComponent } from './exam-schedular-institute.component';

describe('ExamSchedularInstituteComponent', () => {
  let component: ExamSchedularInstituteComponent;
  let fixture: ComponentFixture<ExamSchedularInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamSchedularInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamSchedularInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
