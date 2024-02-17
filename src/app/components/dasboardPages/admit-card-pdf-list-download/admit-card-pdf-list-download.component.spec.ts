import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitCardPdfListDownloadComponent } from './admit-card-pdf-list-download.component';

describe('AdmitCardPdfListDownloadComponent', () => {
  let component: AdmitCardPdfListDownloadComponent;
  let fixture: ComponentFixture<AdmitCardPdfListDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitCardPdfListDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitCardPdfListDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
