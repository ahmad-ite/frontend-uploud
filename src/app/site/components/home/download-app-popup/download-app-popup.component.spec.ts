import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppPopupComponent } from './download-app-popup.component';

describe('DownloadAppPopupComponent', () => {
  let component: DownloadAppPopupComponent;
  let fixture: ComponentFixture<DownloadAppPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadAppPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAppPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
