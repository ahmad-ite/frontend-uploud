import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsManagementComponent } from './steps-management.component';

describe('StepsManagementComponent', () => {
  let component: StepsManagementComponent;
  let fixture: ComponentFixture<StepsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
