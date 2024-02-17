import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivePaperComponent } from './elective-paper.component';

describe('ElectivePaperComponent', () => {
  let component: ElectivePaperComponent;
  let fixture: ComponentFixture<ElectivePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectivePaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectivePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
