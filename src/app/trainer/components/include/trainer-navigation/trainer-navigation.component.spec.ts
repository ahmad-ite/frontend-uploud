import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerNavigationComponent } from './trainer-navigation.component';

describe('TrainerNavigationComponent', () => {
  let component: TrainerNavigationComponent;
  let fixture: ComponentFixture<TrainerNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
