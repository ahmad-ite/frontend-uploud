import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCorrectionsStudentsComponent } from './course-corrections-students.component';

describe('CourseCorrectionsStudentsComponent', () => {
  let component: CourseCorrectionsStudentsComponent;
  let fixture: ComponentFixture<CourseCorrectionsStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCorrectionsStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCorrectionsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
