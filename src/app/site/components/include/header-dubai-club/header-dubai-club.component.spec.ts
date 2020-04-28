import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDubaiClubComponent } from './header-dubai-club.component';

describe('HeaderDubaiClubComponent', () => {
  let component: HeaderDubaiClubComponent;
  let fixture: ComponentFixture<HeaderDubaiClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDubaiClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDubaiClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
