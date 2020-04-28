import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseMainComponent } from './add-course-main.component';

describe('AddCourseMainComponent', () => {
  let component: AddCourseMainComponent;
  let fixture: ComponentFixture<AddCourseMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
