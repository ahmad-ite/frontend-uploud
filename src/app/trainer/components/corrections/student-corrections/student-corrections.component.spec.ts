import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCorrectionsComponent } from './student-corrections.component';

describe('StudentCorrectionsComponent', () => {
  let component: StudentCorrectionsComponent;
  let fixture: ComponentFixture<StudentCorrectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCorrectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCorrectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
