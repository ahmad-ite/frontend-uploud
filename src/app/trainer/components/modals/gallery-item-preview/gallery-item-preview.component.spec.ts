import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemPreviewComponent } from './gallery-item-preview.component';

describe('GalleryItemPreviewComponent', () => {
  let component: GalleryItemPreviewComponent;
  let fixture: ComponentFixture<GalleryItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryItemPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
