
import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager, CourseView, Item } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AddItemsComponent } from '../add-items/add-items.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/shared/modals/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-course-summary',
  templateUrl: './course-summary.component.html',
  styleUrls: ['./course-summary.component.scss']
})
export class CourseSummaryComponent implements OnInit {
  langStyle: any;
  id: any;
  @Input() courseId: number;
  courseItems: any[];
  courseInfo: CourseView;
  // @Input() stepperRef: any;
  //@Input() itemId: number;
  @Output() onItemSteps = new EventEmitter<any>();
  constructor(
    public app_ser: AppService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal
  ) {
    /* this.courseInfo = new CourseView();
    this.courseItems = []; */
    this.langStyle = "wrapper-trainer-course-summary-" + this.app_ser.app_lang();
    // this.id = this.courseId;

  }
  shadows: boolean = true;

  initData() {
    this.courseInfo = new CourseView();
    this.courseItems = [];
    if (this.courseId) {
      this.app_ser.post("site_feed/TrainerCourse/view/" + this.courseId, {}).subscribe(
        data => {
          this.courseInfo = data.row;
          this.courseItems = data.items;

        },
        error => {
        });
    }

  }

  ngOnInit() {
    //this.initData();
  }

  sortBy(m = "") {

  }

  async openItemDialog(title, item = null) {
    console.log(item);

    var itemModal = this.modalService.open(AddItemsComponent, { windowClass: 'itemPopupModal', size: 'lg', centered: true, backdrop: true });
    let copyItem = new Item();
    if (!item) {
      copyItem.course = this.courseId;
    } else {
      copyItem = JSON.parse(JSON.stringify(item))
      copyItem.settings = JSON.parse(item.settings)
      for (const key in copyItem.settings) {
        if (copyItem.settings.hasOwnProperty(key)) {
          copyItem.settings[key] = parseInt(copyItem.settings[key]);
        }
      };
    }
    itemModal.componentInstance.item = copyItem;
    itemModal.componentInstance.title = title;

    return await itemModal.result.then((result) => {
      console.log(result);
      //var copyResult = Object.assign({}, result);
      //let copyResult = JSON.parse(JSON.stringify(result))
      // for (const key in result.settings) {
      //   if (result.settings.hasOwnProperty(key)) {
      //     result['settings][' + key] = result.settings[key];
      //   }
      // }
      if (result) {
        delete result.settings;

        this.app_ser.post("site_feed/TrainerCourse/save_item/" + (!!result.id ? result.id : 0), { data: result }).subscribe(
          data => {

            if (!result.id) {

              this.toastr.success(this.translate.instant('added succesfully'), this.translate.instant('Cool!'));
            }
            else {
              this.toastr.success(this.translate.instant('edit succesfully'), this.translate.instant('Cool!'));
            }
            this.initData();
            this.onItemSteps.emit(data.item_id);
          });
      }


      return result;
    }, (reason) => {
      return false;
    });

  }


  openItemSteps(item) {
    //this.router.navigate(["/trainer/courses/" + this.id + "/items/" + item.id + "/edit"]);
    //this.itemId= item.id;
    // alert(item.id);
    this.onItemSteps.emit(item.id);
    //this.stepperRef.next();
  }

  deleteItem(itemId) {
    this.confirmationDialogService.confirm(this.translate.instant('Delete Item'), 'Do you want to delete this Item?')
      .then((confirmed) => {

        if (confirmed) {
          this.app_ser.post("site_feed/TrainerCourse/delete_item/" + itemId, {}).subscribe(
            data => {
              // this.router.navigate(["/trainer/courses/list"]);
              // this.stepper.next();
              // this.router.navigate(["/trainer/courses/" + data.id + "/edit"]);
              console.log("delete", data)
              this.toastr.success(this.translate.instant('deleted succesfully'), this.translate.instant('Cool!'));

              this.initData();
            });
        }
      })
      .catch(() => {

      });
  }

  reArrangeItem(item, newArrange) {
    console.log(item, newArrange);
    if (newArrange > 0 && newArrange <= this.courseItems.length) {
      this.app_ser.post("site_feed/TrainerCourse/re_arrange_item/" + item.id + "/" + newArrange, {}).subscribe(
        data => {
          // this.router.navigate(["/trainer/courses/list"]);
          // this.stepper.next();
          // this.router.navigate(["/trainer/courses/" + data.id + "/edit"]);
          //this.toastr.success("Item: deleted succesfully", "Cool!");
          item.arrange = newArrange;
          //this.initData();
        });
    }


  }


}
