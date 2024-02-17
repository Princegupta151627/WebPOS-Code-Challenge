import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebarredStudentsComponent } from './debarred-students.component';

describe('DebarredStudentsComponent', () => {
  let component: DebarredStudentsComponent;
  let fixture: ComponentFixture<DebarredStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebarredStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebarredStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
