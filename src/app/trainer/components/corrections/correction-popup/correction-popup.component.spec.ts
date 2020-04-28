import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionPopupComponent } from './correction-popup.component';

describe('CorrectionPopupComponent', () => {
  let component: CorrectionPopupComponent;
  let fixture: ComponentFixture<CorrectionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
