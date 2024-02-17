import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSuccessMessageComponent } from './popup-success-message.component';

describe('PopupSuccessMessageComponent', () => {
  let component: PopupSuccessMessageComponent;
  let fixture: ComponentFixture<PopupSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSuccessMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
