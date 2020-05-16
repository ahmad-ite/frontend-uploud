import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGalleryPopupComponent } from './upload-gallery-popup.component';

describe('UploadGalleryPopupComponent', () => {
  let component: UploadGalleryPopupComponent;
  let fixture: ComponentFixture<UploadGalleryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGalleryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGalleryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
