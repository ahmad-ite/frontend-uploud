import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailPopupComponent } from './video-detail-popup.component';

describe('VideoDetailPopupComponent', () => {
  let component: VideoDetailPopupComponent;
  let fixture: ComponentFixture<VideoDetailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDetailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
