import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionIndexComponent } from './correction-index.component';

describe('CorrectionIndexComponent', () => {
  let component: CorrectionIndexComponent;
  let fixture: ComponentFixture<CorrectionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectionIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
