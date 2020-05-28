import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CourseView, Session } from 'src/app/_models/loadData';
import { Location } from '@angular/common';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LiveStreamingComponent implements OnInit {
  langStyle: any;
  active_item_index: any;
  opacityShowHide: any = 'hideItemSummary';
  // sessionData = [
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2021',
  //     type: 'شغل الفيديو',
  //     is_archived: 'No'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'ee'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: '434343'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'dsdw'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   },
  //   {
  //     title: 'عنوان الجلسة',
  //     date: '02-02-2020',
  //     type: 'شغل الفيديو',
  //     is_archived: 'نعم'
  //   }
  // ];
  itemMouseOverIndex: any;
  regId: any;
  courseDetail: CourseView;
  rating_arr: any[];
  courseGifLoader: boolean;
  sessions: any[];
  model: NgbDateStruct;
  time: NgbTimeStruct;
  activeSession: Session;
  private calendar: NgbCalendar
  currentTime: any;
  prevTime: Date;
  nextTime: Date;
  sessionData: any[];
  courseId: any;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private location: Location,
  ) {
    this.langStyle = "live-streaming-main-" + this.app_ser.app_lang();



  }
  initData() {
    if (this.regId) {
      this.courseGifLoader = true;

      this.app_ser.post("site_feed/UserCourse/view_live_course/" + this.regId, {}).subscribe(
        data => {

          this.courseDetail = data;
          this.initSessions();
          this.rating_arr = this.app_ser.initStarRating(this.courseDetail.average_rate);
          this.courseGifLoader = false;

        })
    }

    if (this.courseId) {
      this.courseGifLoader = true;

      this.app_ser.post("site_feed/TrainerCourse/view_live_course/" + this.courseId, {}).subscribe(
        data => {

          this.courseDetail = data;
          this.initSessions();
          this.rating_arr = this.app_ser.initStarRating(this.courseDetail.average_rate);
          this.courseGifLoader = false;

        })
    }

  }
  initSessions() {
    this.selectToday();
    this.sessionData = [];
    this.activeSession = new Session();
    for (var i = 0; i < this.courseDetail.items.length; i++) {
      var sess = new Session();
      sess.item = this.courseDetail.items[i];
      sess.status = this.initStatus(i);

      this.sessionData.push(sess);
    }
  }
  initStatus(i) {
    var status = "finished"
    var sessTime = new Date(this.courseDetail.items[i].session_time);
    console.log("sessTime", sessTime);
    console.log("currentTime", this.currentTime);
    console.log("prevTime", this.prevTime);
    console.log("nextTime", this.nextTime);
    console.log("-----------");
    if (sessTime < this.prevTime)
      return "finished";

    if (sessTime >= this.currentTime && sessTime <= this.nextTime) {
      this.active_item_index = i;
      return "soon";
    }
    if (sessTime > this.prevTime && sessTime < this.currentTime) {
      this.active_item_index = i;
      return "now";
    }


    if (sessTime > this.nextTime) {
      if (this.active_item_index == -1) {
        this.active_item_index = i;
      }
      return "future";
    }


    return "future";

    if (sessTime > this.prevTime && sessTime < this.currentTime) {
      this.active_item_index = i;
      return "soon";
    }

    if (sessTime >= this.currentTime && sessTime <= this.nextTime) {
      this.active_item_index = i;
      return "now";
    }
    if (sessTime > this.nextTime) {
      if (this.active_item_index == -1) {
        this.active_item_index = i;
      }
      return "future";
    }



  }
  startSession(index) {
    // alert(index);
    if (this.checkSessionStatus(this.sessionData[index].status)) {
      var url = "https://kun.academy/live/#/session/" + this.sessionData[index].item.id + "/" + this.app_ser.getCurrentUser().id;

      // var url = "http://localhost:4400/#/session/" + this.sessionData[index].item.id + "/" + this.app_ser.getCurrentUser().id;


      window.open(url, "_blank");
    }
  }
  checkSessionStatus(status) {
    // alert(status);
    if (status == "now" || status == "soon")
      return true;

    return false;

  }
  ngOnInit() {
    this.regId = this.route.snapshot.params['regId'] ? this.route.snapshot.params['regId'] : 0;
    this.courseId = this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 0;
    this.courseDetail = new CourseView();
    this.active_item_index = -1;
    this.initData();
  }

  selectToday() {
    var nowDate = new Date();

    this.currentTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes());
    this.prevTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours() - 3, nowDate.getMinutes());
    this.nextTime = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours() + 3, nowDate.getMinutes());


  }
  changeStyle($event: any, itemMouseOverIndex) {

    if ($event.type == 'mouseenter') {
      console.log("itemMouseOverIndex", itemMouseOverIndex);
      console.log("event", $event);
      this.opacityShowHide = this.stepLessonLastItemsClass(itemMouseOverIndex);
      this.itemMouseOverIndex = itemMouseOverIndex;
      console.log("opacityShowHide", this.opacityShowHide);
    }
    else {
      this.opacityShowHide = 'hideItemSummary' + ' ' + this.stepLessonLastItemsClass(itemMouseOverIndex);
    }

  }
  stepLessonLastItemsClass(index) {

    var l = 10;
    var length = this.sessionData.length;
    if (length >= l) {
      if (index > length - 6) {
        return 'lastLessonItem'
      }
      else {
        return 'showItemSummary'
      }
    }
    else {
      return 'showItemSummary'
    }
  }
}
