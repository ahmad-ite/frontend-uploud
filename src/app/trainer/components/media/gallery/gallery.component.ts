
import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { VideoDerivation } from 'src/app/_models/loadData';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {
  pager: { totalItems: number; currentPage: number; pageSize: number; totalPages: number; startPage: number; endPage: number; startIndex: number; endIndex: number; pages: number[]; show: boolean; };
  trainerContent: VideoDerivation[];
  activeTab: string = 'image';
  currentCourse: number = 0;
  loadGifLoader: any = true;
  activeSecondryTab: string = 'ar';
  langStyle: string;


  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private location: Location,
  ) {
    // this.activeTab = "dubbing";
    this.trainerContent = [];
    this.loadPage(1);
    this.langStyle = "wrapper-trainer-gallery-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }
  openFileUploadModal() {
    this.app_ser.uploadTrainerMedia(19, 'video').then(result => {
      if (result) {
        this.toastr.success(this.translate.instant('reset successfully'), this.translate.instant('thank you'));

      }


    });
  }
  loadPage(page) {

    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: page - 1, size: 12, course: this.currentCourse }

    if (this.activeTab == 'dubbing' || this.activeTab == 'subtitle') {
      data1['where][lang'] = this.activeSecondryTab;
    }


    this.loadGifLoader = true;
    this.app_ser.post("site_feed/TrainerContent/pages/" + this.activeTab, { data: data1 }).subscribe(
      data => {

        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.trainerContent = data.rows;
        this.loadGifLoader = false;
        // alert(this.loadGifLoader);
      },
      error => {
        this.loadGifLoader = false;
      });
  }
  onChangePage(page) {
    this.loadPage(page);
  }

  onTabChange($event: NgbTabChangeEvent) {
    this.activeTab = $event.nextId;
    this.trainerContent = [];
    this.loadPage(1);
  }
  onSecondryTabChange($event: NgbTabChangeEvent) {

    this.activeSecondryTab = $event.nextId;

    this.trainerContent = [];
    this.loadPage(1);
  }
}
