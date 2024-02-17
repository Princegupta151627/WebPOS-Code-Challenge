import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMessageForButtonsComponent } from './popup-message-for-buttons.component';

describe('PopupMessageForButtonsComponent', () => {
  let component: PopupMessageForButtonsComponent;
  let fixture: ComponentFixture<PopupMessageForButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMessageForButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupMessageForButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
