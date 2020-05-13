import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGalleryComponent } from './show-gallery.component';

describe('ShowGalleryComponent', () => {
  let component: ShowGalleryComponent;
  let fixture: ComponentFixture<ShowGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
