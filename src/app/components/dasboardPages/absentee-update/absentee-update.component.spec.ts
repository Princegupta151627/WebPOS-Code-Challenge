import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteeUpdateComponent } from './absentee-update.component';

describe('AbsenteeUpdateComponent', () => {
  let component: AbsenteeUpdateComponent;
  let fixture: ComponentFixture<AbsenteeUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenteeUpdateComponent]
    });
    fixture = TestBed.createComponent(AbsenteeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
