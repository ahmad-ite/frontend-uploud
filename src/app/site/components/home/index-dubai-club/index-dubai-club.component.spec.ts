import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDubaiClubComponent } from './index-dubai-club.component';

describe('IndexDubaiClubComponent', () => {
  let component: IndexDubaiClubComponent;
  let fixture: ComponentFixture<IndexDubaiClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexDubaiClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDubaiClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
