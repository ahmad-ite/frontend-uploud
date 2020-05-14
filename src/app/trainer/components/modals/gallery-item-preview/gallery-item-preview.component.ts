
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { v4 as uuid } from 'uuid';
import { promise } from 'protractor';
import { Course, VideoDerivation } from 'src/app/_models/loadData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery-item-preview',
  templateUrl: './gallery-item-preview.component.html',
  styleUrls: ['./gallery-item-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryItemPreviewComponent implements OnInit {
  @Input() imageObj: VideoDerivation;
  @Input() video: VideoDerivation;
  @Input() details: boolean;
  langStyle: any;
  
  
  
  constructor(
    public app_ser: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.langStyle = "wrapper-preview-gallery-item-" + this.app_ser.app_lang();
    

  }

  ngOnInit() {
    
  }
  galleryUploadModal() {
    
  }

}

