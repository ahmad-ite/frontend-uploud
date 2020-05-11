
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
import { VideoDerivation, Item } from 'src/app/_models/loadData';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddItemsComponent implements OnInit {
  langStyle: any;
  //courseId: number;
  //itemId: number;
  @Input() item: Item;
  //items: any[];
  shadows: boolean = true;
  @Input() title: string;
  settingsKeys={
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
    this.langStyle = "wrapper-add-item-" + this.app_ser.app_lang();
    //this.courseId = parseInt(this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 0);
    //this.itemId = parseInt(this.route.snapshot.params['itemId'] ? this.route.snapshot.params['itemId'] : 0);
    /* if(!this.item){
      this.item = new Item();
    } */

    
  }

  ngOnInit() {
    // this.item = new Item();
    //this.reloadItems();
    console.log(this.item);
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
      this.activeModal.close(this.item);
  }
  
}
