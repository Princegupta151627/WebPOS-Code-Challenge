import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardListDownloadInstituteComponent } from './admit-card-list-download-institute.component';

describe('AdmitCardListDownloadInstituteComponent', () => {
  let component: AdmitCardListDownloadInstituteComponent;
  let fixture: ComponentFixture<AdmitCardListDownloadInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitCardListDownloadInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitCardListDownloadInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
