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
import { VideoDerivation, Course } from 'src/app/_models/loadData';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

import { v4 as uuid } from 'uuid';
import { promise } from 'protractor';
import { ConfirmationDialogService } from 'src/app/shared/modals/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-upload-gallery-popup',
  templateUrl: './upload-gallery-popup.component.html',
  styleUrls: ['./upload-gallery-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadGalleryPopupComponent implements OnInit {

  pager: { totalItems: number; currentPage: number; pageSize: number; totalPages: number; startPage: number; endPage: number; startIndex: number; endIndex: number; pages: number[]; show: boolean; };
  trainerContent: VideoDerivation[];
  /* activeTab: string;
  currentCourse: number = 0; */
  loadGifLoader: any = true;
  activeSecondryTab: string = 'ar';
  selectedCourse: number;
  langStyle: any;
  @Input() currentCourse;
  @Input() activeTab: string;
  @Input() mode: string;
  @Input() lang: string;
  courses: Course[];
  selectedFiles: FileList;
  FOLDER: any;
  dubbing: any;
  maximumFiles: any;
  maximumFilesize: any;
  totalSize: any;



  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private confirmationDialogService: ConfirmationDialogService,
    public activeModal: NgbActiveModal,
    private location: Location,
  ) {
    this.FOLDER = "media_files/"
    this.dubbing = 0;
    this.maximumFiles = 10;
    this.maximumFilesize = 1;
    this.totalSize = 0;

    this.app_ser.post("site_feed/TrainerCourse/all_courses", {}).subscribe(
      data => {
        this.courses = data;
        this.selectedCourse = this.currentCourse;

      },
      error => {
      });

  }

  ngOnInit() {
    this.trainerContent = [];
    if (this.lang)
      this.activeSecondryTab = this.lang;

    this.langStyle = "wrapper-trainer-gallery-popup-" + this.app_ser.app_lang();
  }

  public dropped1(files: NgxFileDropEntry[]) {
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

  public fileOver1(event) {
  }

  public fileLeave1(event) {
  }
  openFileUploadModal() {
    this.app_ser.uploadTrainerMedia(19, 'video').then(result => {
      if (result) {
        this.toastr.success(this.translate.instant('reset successfully'), this.translate.instant('thank you'));

      }


    });
  }

  onChangePage(page) {

  }

  onTabChange($event: NgbTabChangeEvent) {
    this.activeTab = $event.nextId;
    this.activeSecondryTab = "ar"
    this.trainerContent = [];
    this.uploadded_files = [];
    return
    if (this.uploadded_files.length) {
      this.confirmationDialogService.confirm(this.translate.instant('Alert'), 'there are files in the stack')
        .then((confirmed) => {
          this.activeTab = $event.nextId;
          this.activeSecondryTab = "ar"
          this.trainerContent = [];
          this.uploadded_files = [];
        })
        .catch(() => {
          return false
        });
    }
  }
  onSecondryTabChange($event: NgbTabChangeEvent) {
    this.activeSecondryTab = $event.nextId;
    this.trainerContent = [];
    return
    if (this.uploadded_files.length) {
      this.confirmationDialogService.confirm(this.translate.instant('Alert'), 'there are files in the stack')
        .then((confirmed) => {
          this.activeSecondryTab = $event.nextId;
          this.trainerContent = [];
        })
        .catch(() => {
          return false
        });
    }


  }
  checkStack() {
    if (this.uploadded_files.length) {
      this.confirmationDialogService.confirm(this.translate.instant('Alert'), 'there are files in the stack')
        .then((confirmed) => {
          return confirmed
        })
        .catch(() => {
          return false
        });
    }
    return true;
  }

  view(element) {

  }
  select(element) {
    this.activeModal.close(element)

  }
  ChangedCourse() {
    this.currentCourse = this.selectedCourse;
    this.uploadded_files = [];
    return
    if (this.uploadded_files.length) {
      this.confirmationDialogService.confirm(this.translate.instant('Alert'), 'there are files in the stack')
        .then((confirmed) => {
          this.currentCourse = this.selectedCourse;
          this.uploadded_files = [];
        })
        .catch(() => {
          return false
        });
    }
  }



  ///upload

  ChangedDubbing() {
    this.dubbing = !this.dubbing;
    for (var i = 0; i < this.uploadded_files.length; i++) {
      this.uploadded_files[i].dubbing = this.dubbing;
    }
  }

  ChangedCourse1() {


    for (var i = 0; i < this.uploadded_files.length; i++) {
      this.uploadded_files[i].course = this.selectedCourse;
    }
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  public events: any[] = [];
  public uploaded: any = 0;

  async uploadFiles() {

    for (var i = 0; i < this.uploadded_files.length; i++) {
      await this.uploadFile(i);

    }
  }
  initExtention() {
    switch (this.activeTab) {
      case "video":
        return ".mp4"
        break;

      case "dubbing":
        return ".mp4"
        break;

      case "image":
        return ".jpg"
        break;

      case "audio":
        return ".mp3"
        break;

      case "subtitle":
        return ".srt"
        break;


    }
  }

  async uploadFile(i) {
    if (this.uploadded_files[i].status != "Completed") {
      this.uploadded_files[i].uuid = Date.now() + "-" + i + uuid();
      this.uploadded_files[i].status = "processing"
      var file = this.uploadded_files[i].file;

      this.uploadded_files[i].uuid += this.initExtention();

      const contentType = file.type;
      const params = {
        Bucket: 'kun-academy',
        // Key: this.FOLDER + file.name,
        Key: this.FOLDER + this.uploadded_files[i].uuid,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
      };
      var self = this;
      await this.app_ser.uploadFile(file).upload(params).on('httpUploadProgress', (evt) => {
        this.uploadded_files[i].uploaded = Math.round(evt.loaded / evt.total * 100);

      }).send(function (err, data) {
        if (err) {

          self.uploadded_files[i].status = "Failed";
          self.uploadded_files[i].uploaded = 0;
          return false;
        }
        if (data && data.Location) {
          self.saveFile(i);
          return true;
        }
        return false;
      }, this);


    }
  }
  saveFile(i) {
    var post_data = { uuid: this.uploadded_files[i].uuid, course: this.uploadded_files[i].course, dubbing: 0, name: this.uploadded_files[i].file.name, file_type: this.uploadded_files[i].file.type, size: this.uploadded_files[i].file.size, type: this.activeTab, lang: this.activeSecondryTab };

    if (this.activeTab == "dubbing") {
      post_data.dubbing = 1;
      post_data.type = "video"
    }
    this.app_ser.post("site_feed/TrainerContent/upload_file", { data: post_data }).subscribe(
      res => {
        if (res) {
          this.uploadded_files[i].status = "Completed";
        }

        else {
          this.uploadded_files[i].status = "Error";
          this.uploadded_files[i].uploaded = 0;
        }


      });

  }

  allawdExtension() {
    return this.app_ser.appropriateExtension(this.activeTab);
  }
  public files: NgxFileDropEntry[] = [];
  public uploadded_files: any[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var allowedExtensions = this.app_ser.appropriateExtension(this.activeTab);
          var ext = file.name.split('.').pop()
          var allowed = true;

          if (this.uploadded_files.length > this.maximumFiles - 1) {//count files
            allowed = false;
          }
          if (!file.size) {
            allowed = false;
          }
          if (allowed) {
            if (this.totalSize + file.size > (1073741824 * this.maximumFilesize)) {//1 Gega * 2 = 2 Giga
              allowed = false;
            }
          }
          if (allowed && allowedExtensions.indexOf(ext) !== -1) {
            var f1 = { file: file, dubbing: 0, loaded: 0, total: file.size, uploaded: 0, status: "waiting", uuid: "", course: 0 }

            this.totalSize = this.totalSize + file.size;
            this.uploadded_files.push(f1);
            this.events.push(0);
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  percent(item) {

    return this.round((100 * this.uploaded) / item.total);
  }
  public fileOver(event) {
  }

  public fileLeave(event) {
  }
  round(num) {
    return Math.round(num * 100) / 100;
  }
  deleteFile(i) {

    this.totalSize = this.totalSize - this.uploadded_files[i].file.size;
    this.uploadded_files.splice(i, 1);

  }
  changeDubbingItem(i) {
    this.uploadded_files[i].dubbing = !this.uploadded_files[i].dubbing;
  }
}
