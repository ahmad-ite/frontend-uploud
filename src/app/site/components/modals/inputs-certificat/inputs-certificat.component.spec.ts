import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsCertificatComponent } from './inputs-certificat.component';

describe('InputsCertificatComponent', () => {
  let component: InputsCertificatComponent;
  let fixture: ComponentFixture<InputsCertificatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsCertificatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
