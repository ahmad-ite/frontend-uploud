import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileSetupComponent } from './trainer-profile-setup.component';

describe('TrainerProfileSetupComponent', () => {
  let component: TrainerProfileSetupComponent;
  let fixture: ComponentFixture<TrainerProfileSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerProfileSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
