import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { v4 as uuid } from 'uuid';
import { promise } from 'protractor';
import { Course } from 'src/app/_models/loadData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaUploadComponent implements OnInit {
  @Input() inputCourse: number;
  @Input() type: string;

  selectedFiles: FileList;
  FOLDER: any;
  dubbing: any;
  maximumFiles: any;
  maximumFilesize: any;
  totalSize: any;
  courses: Course[]
  selectedCourse: number;
  courseDisabled: boolean = false;
  dubbingDisabled: boolean = false;
  langStyle: any;
  constructor(
    private app_ser: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.langStyle = "wrapper-trainer-media-upload-" + this.app_ser.app_lang();
    this.FOLDER = "media_files/"
    this.dubbing = 0;
    this.maximumFiles = 15;
    this.maximumFilesize = 2;
    this.totalSize = 0;
    this.selectedCourse = 0;
    this.app_ser.post("site_feed/TrainerCourse/all_courses", {}).subscribe(
      data => {
        this.courses = data;

        this.initFlags();
      },
      error => {

      });



  }
  initFlags() {

    if (this.inputCourse) {
      this.selectedCourse = this.inputCourse;
      this.courseDisabled = true;
    }
  }

  ngOnInit() {
  }
  ChangedDubbing() {
    this.dubbing = !this.dubbing;
    for (var i = 0; i < this.uploadded_files.length; i++) {
      this.uploadded_files[i].dubbing = this.dubbing;
    }
  }

  ChangedCourse() {


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

  async uploadFile(i) {
    if (this.uploadded_files[i].status != "completed") {
      this.uploadded_files[i].uuid = Date.now() + "-" + i + uuid();
      this.uploadded_files[i].status = "processing"
      var file = this.uploadded_files[i].file;
      if (file.type.includes("video")) {
        this.uploadded_files[i].uuid += ".mp4";
      }
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
        // if (this.uploadded_files[i].uploaded == 100) {
        // }
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
    var post_data = { uuid: this.uploadded_files[i].uuid, course: this.uploadded_files[i].course, dubbing: this.uploadded_files[i].dubbing, name: this.uploadded_files[i].file.name, file_type: this.uploadded_files[i].file.type, size: this.uploadded_files[i].file.size, type: "video" };
    // post_data.uuid = this.uploadded_files[i].uuid;
    this.app_ser.post("site_feed/course/upload_file", { data: post_data }).subscribe(
      res => {
        if (res) {
          this.uploadded_files[i].status = "completed";
        }

        else {
          this.uploadded_files[i].status = "Error";
          this.uploadded_files[i].uploaded = 0;
        }


      });

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
          var allowedExtensions = ['mp4', '3gp', 'ogg', 'wmv ', 'webm ', 'flv', 'AVI', 'avi'];
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
            var f1 = { file: file, dubbing: 0, loaded: 0, total: file.size, uploaded: 0, status: "pending", uuid: "", course: this.inputCourse }

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
