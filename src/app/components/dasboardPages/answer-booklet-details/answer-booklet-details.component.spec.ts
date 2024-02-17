import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBookletDetailsComponent } from './answer-booklet-details.component';

describe('AnswerBookletDetailsComponent', () => {
  let component: AnswerBookletDetailsComponent;
  let fixture: ComponentFixture<AnswerBookletDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerBookletDetailsComponent]
    });
    fixture = TestBed.createComponent(AnswerBookletDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
