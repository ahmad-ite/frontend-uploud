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
  @Input() courseId: number;
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
  deleteDubbingfile(dubbing) {
    console.log(" this.video dubbing", dubbing)
    this.app_ser.post("site_feed/TrainerContent/removeDubbing/" + this.video.dubbing[dubbing.code].id, {}).subscribe(
      dasultData => {
        delete this.video.dubbing[dubbing.code]
      });
  }
  editDubbingfile(dubbing) {

    this.app_ser.openGalleryPopup(this.courseId, 'dubbing', "select", dubbing.code).then(res => {
      if (res) {
        // console.log(" this.video res", res)
        this.app_ser.post("site_feed/TrainerContent/saveDubbing/" + this.video.uuid, { data: { file: res.uuid, lang: dubbing.code } }).subscribe(
          dasultData => {
            this.video.dubbing[dubbing.code] = {};
            this.video.dubbing[dubbing.code].basic_uuid = this.video.uuid;
            this.video.dubbing[dubbing.code].file = res.uuid;
            this.video.dubbing[dubbing.code].name = res.file_name;
            this.video.dubbing[dubbing.code].lang = dubbing.code;
            this.video.dubbing[dubbing.code].id = dasultData;
          });



      }

    })

  }


  deleteSubtitlefile(dubbing) {
    console.log(" this.video dubbing", dubbing)
    this.app_ser.post("site_feed/TrainerContent/removeSubtitle/" + this.video.subtitle[dubbing.code].id, {}).subscribe(
      dasultData => {
        delete this.video.subtitle[dubbing.code]
      });
  }
  editSubtitlefile(dubbing) {

    this.app_ser.openGalleryPopup(this.courseId, 'subtitle', "select", dubbing.code).then(res => {
      if (res) {
        // console.log(" this.video res", res)
        this.app_ser.post("site_feed/TrainerContent/saveSubtitle/" + this.video.uuid, { data: { file: res.uuid, lang: dubbing.code } }).subscribe(
          dasultData => {
            this.video.subtitle[dubbing.code] = {};
            this.video.subtitle[dubbing.code].basic_uuid = this.video.uuid;
            this.video.subtitle[dubbing.code].file = res.uuid;
            this.video.subtitle[dubbing.code].name = res.file_name;
            this.video.subtitle[dubbing.code].lang = dubbing.code;
            this.video.subtitle[dubbing.code].id = dasultData;
          });



      }

    })

  }

}
