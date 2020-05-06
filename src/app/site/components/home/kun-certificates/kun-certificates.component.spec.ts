import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KunCertificatesComponent } from './kun-certificates.component';

describe('KunCertificatesComponent', () => {
  let component: KunCertificatesComponent;
  let fixture: ComponentFixture<KunCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KunCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KunCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
