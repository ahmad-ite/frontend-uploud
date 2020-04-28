import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOutLinkComponent } from './test-out-link.component';

describe('TestOutLinkComponent', () => {
  let component: TestOutLinkComponent;
  let fixture: ComponentFixture<TestOutLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOutLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOutLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
