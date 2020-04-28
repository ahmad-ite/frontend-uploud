import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordFormComponent } from './set-password-form.component';

describe('SetPasswordFormComponent', () => {
  let component: SetPasswordFormComponent;
  let fixture: ComponentFixture<SetPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
