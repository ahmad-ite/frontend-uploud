import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCoursesComponent } from './category-courses.component';

describe('CategoryCoursesComponent', () => {
  let component: CategoryCoursesComponent;
  let fixture: ComponentFixture<CategoryCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
