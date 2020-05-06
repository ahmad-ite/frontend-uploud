import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterReportComponent } from './quarter-report.component';

describe('QuarterReportComponent', () => {
  let component: QuarterReportComponent;
  let fixture: ComponentFixture<QuarterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
