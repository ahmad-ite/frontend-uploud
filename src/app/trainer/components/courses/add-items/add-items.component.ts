
import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct, NgbDatepicker, NgbCalendar, NgbTimepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { VideoDerivation, Item, CourseView, Course } from 'src/app/_models/loadData';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import * as moment from 'moment';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddItemsComponent implements OnInit {
  langStyle: any;

  @Input() item: Item;

  shadows: boolean = true;
  @Input() title: string;
  @Input() courseInfo: Course;

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp', { static: false }) dp: NgbDatepicker;
  settingsKeys = {
    'Exam': {
      'save_answers_on_move': 'save_answers_on_move',
      'custom_navigating': 'exam_custom_navigating',
      'no_back': 'exam_no_back',
      'no_mark': 'exam_no_mark',
      'show_correct': 'exam_show_correct',
      'show_result': 'exam_show_result',
      'input_repeat': 'input_repeat_exams'
    },
    'Lesson': {
      'save_answers_on_move': 'save_answers_on_move',
      'custom_navigating': 'lesson_custom_navigating',
      'no_back': 'lesson_no_back',
      'no_mark': 'lesson_no_mark',
      'show_correct': 'lesson_show_correct',
      'show_result': 'lesson_show_result',
      'input_repeat': 'input_repeat_lesson'
    }
  };
  number: number;
  time: NgbTimeStruct;
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

    private calendar: NgbCalendar
  ) {
    this.time = { hour: 11, minute: 11, second: 11 };
    this.number = Date.now();
    this.langStyle = "wrapper-add-item-" + this.app_ser.app_lang();




  }
  getTitleName() {
    if (this.courseInfo.template_id == 122) {
      return "Session";
    }
    return "Item";
  }
  selectToday() {
    this.model = this.calendar.getToday();
    var now = moment();
    let options = {
      timeZone: 'Asia/Dubai',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      second: 'numeric',
    },
      formatter = new Intl.DateTimeFormat([], options);




    var res = formatter.format(new Date()).split(",");


    var date = res[0].split("/");
    this.model.year = parseInt(date[2]);
    this.model.month = parseInt(date[0]);
    this.model.day = parseInt(date[1]);

    var t = res[1].split(":");
    this.time.hour = parseInt(t[0]);
    this.time.minute = parseInt(t[1]);
    this.time.second = parseInt(t[2]);


    // this.time = { hour: 13, minute: 30, second: 0 };
    // this.model = this.calendar.getToday();


  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
  }

  navigateEvent(event) {
    this.date = event.next;
  }

  ngOnInit() {
    // this.item = new Item();
    this.initDate();


  }
  initDate() {

    if (this.courseInfo.template_id == 122) {
      this.selectToday()
      if (!this.item.session_time) {
        this.selectToday()
      }
      else {
        var res = this.item.session_time.split(" ");


        var date = res[0].split("-");
        this.model.year = parseInt(date[0]);
        this.model.month = parseInt(date[1]);
        this.model.day = parseInt(date[2]);

        var t = res[1].split(":");
        this.time.hour = parseInt(t[0]);
        this.time.minute = parseInt(t[1]);
        this.time.second = parseInt(t[2]);


      }
    }

  }

  sortBy(m = "") {

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
  selectImg() {
    this.app_ser.openGalleryPopup(this.item.course, "image", "select").then(res => {
      if (res) {

        this.item.image = res.uuid;
      }

    })
  }
  public fileOver(event) {
  }

  public fileLeave(event) {
  }

  /* public reloadItems() {
    if (this.courseId) {
      this.app_ser.post("site_feed/TrainerCourse/view/" + this.courseId, {}).subscribe(
        data => {
          this.items = data.items;
          //this.onChangeItem();
        },
        error => {
        });
    }
  } */

  /* public onChangeItem() {
    if (!!this.itemId && this.itemId != 0) {
      this.title = "Edit Item";
      this.app_ser.post("site_feed/TrainerCourse/item_row/" + this.itemId, {}).subscribe(
        data => {
          this.item = data.row;
          //this.router.navigate(["/trainer/courses/"+ this.courseId + "/items/"+ this.itemId, "/edit"]);
          window.history.replaceState({}, null, "/trainer/courses/"+ this.courseId + "/items/"+ this.itemId+ "/edit");
        },
        error => {
        });
    }else {
      this.item= new Item();
      this.item.course = this.courseId;
      this.itemId = 0;
      window.history.replaceState({}, null, "/trainer/courses/"+ this.courseId + "/edit");
    }
  } */

  save() {

    console.log("time", this.time, this.model);

    if (this.courseInfo.template_id == 122 && this.time && this.model && (!this.item.id)) {
      this.item.session_time = this.model.year + "-" + this.model.month + "-" + this.model.day + " " + this.time.hour + ":" + this.time.minute + ":00";
      console.log(" this.item.session_time", this.item.session_time);
    }
    else {
      delete this.item.session_time;
    }

    this.item.is_basic = 1;
    delete this.item.settings;
    this.app_ser.post("site_feed/TrainerCourse/save_item/" + (!!this.item.id ? this.item.id : 0), { data: this.item }).subscribe(
      data => {

        if (!this.item.id) {

          this.toastr.success(this.translate.instant('added succesfully'), this.translate.instant('Cool!'));
        }
        else {
          this.toastr.success(this.translate.instant('edit succesfully'), this.translate.instant('Cool!'));
        }
        this.activeModal.close(this.item);
      });




  }

}
