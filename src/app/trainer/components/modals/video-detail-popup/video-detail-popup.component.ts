import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { v4 as uuid } from 'uuid';
import { promise } from 'protractor';
import { Course, VideoDerivation } from 'src/app/_models/loadData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-video-detail-popup',
  templateUrl: './video-detail-popup.component.html',
  styleUrls: ['./video-detail-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoDetailPopupComponent implements OnInit {
  @Input() video: VideoDerivation;
  @Input() details: boolean;
  langStyle: any;
  constructor(
    public app_ser: AppService,
    public activeModal: NgbActiveModal,
    private translate: TranslateService,
  ) {
    this.langStyle = "wrapper-video-detail-" + this.app_ser.app_lang();


  }

  ngOnInit() {

  }
  galleryUploadModal() { }

}
