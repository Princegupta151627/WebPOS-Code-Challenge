import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalInstituteComponent } from './external-institute.component';

describe('ExternalInstituteComponent', () => {
  let component: ExternalInstituteComponent;
  let fixture: ComponentFixture<ExternalInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
