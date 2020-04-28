import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseView } from '../../../../_models/loadData';
import { VgAPI } from 'videogular2/compiled/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { TermsAndConditionsComponent } from '../../modals/terms-and-conditions/terms-and-conditions.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Globals } from 'src/app/globals';
import { MetafrenzyService } from 'ngx-metafrenzy';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailComponent implements OnInit {
  courseDetail: CourseView;
  code: any;
  hours: any;
  minutes: Number;
  api: any;
  video: any;
  video_derivation: any;
  time: any = 0;
  seconds: any;
  toggleIcons: any[];
  dubbingContent: any = false;
  activeDubbing: any = -1;
  dubbingList: any[];
  qualitiesList: any[];
  closeResult: string;
  content: any;
  settingItem: any = false;
  qualityContent: any = false;
  subtitleContent: any = false;
  langStyle: any;
  // dubbingList = [
  //   { code: 'ar', name: "Ar" },
  //   { code: 'en', name: "English" },
  //   { code: 'sp', name: "Spanish" },
  //   { code: 'gr', name: "German" }
  // ];
  videoSettings = [
    { name: "Dubbing", value: 'Ar' },
    { name: "Subtitles", value: 'En' },
    { name: "Quality", value: '1040 hd' }
  ];
  rating_arr: any[];
  activeQuality: any = -1;
  courseGifLoader: boolean = false;
  showPaymentModal: boolean;
  constructor(
    public globals: Globals,
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private readonly metafrenzyService: MetafrenzyService,
    private modalService: NgbModal
  ) {
    this.langStyle = "wrapper-courseDetail-lang-" + this.app_ser.app_lang();
    this.courseDetail = new CourseView();
    this.toggleIcons = [];
    this.code = this.route.snapshot.params['code'];
    this.initData();

  }


  initData() {
    this.ngxService.start();
    this.app_ser.post("site_feed/course/view_course_by_code/" + this.code, {}).subscribe(
      data => {

        this.ngxService.stop();
        this.metafrenzyService.setTitle(data.name);
        this.metafrenzyService.setMetaTag('og:title', data.name);
        this.metafrenzyService.setTags({
          title: data.name,
        });
        this.courseDetail = data;
        this.rating_arr = this.app_ser.initStarRating(this.courseDetail.average_rate);
        this.video = this.courseDetail.video;
        this.video_derivation = this.courseDetail.video_derivation;
        this.dubbingList = this.app_ser.getDubbingList(this.courseDetail.video_derivation);
        var arabicIndex = this.app_ser.getDubbingLangIndex(this.dubbingList);

        this.changeDubbing(arabicIndex);
        // this.initRating();


      },
      error => {

      });
  }
  changeDubbing(index) {

    if (this.api && this.api.getDefaultMedia())
      this.time = this.api.getDefaultMedia().currentTime;
    else
      this.time = 0
    if (index == -1) {
      this.video = this.courseDetail.video;
      this.video_derivation = this.courseDetail.video_derivation;


    }
    else {
      this.video = this.dubbingList[index].link;
      this.video_derivation = this.courseDetail.video_derivation.dubbings[this.dubbingList[index].code + '_video_derivation'];
    }


    this.activeDubbing = index;
    this.qualitiesList = [];
    this.qualitiesList = this.app_ser.getQualityList(this.video_derivation);
    this.changeQuality(-1, 1)
  }
  changeQuality(index, mode = null) {

    if (this.qualitiesList.length) {
      if (!mode) {
        if (this.api && this.api.getDefaultMedia())
          this.time = this.api.getDefaultMedia().currentTime;
        else
          this.time = 0
      }

      if (index == -1) {
        var q = this.app_ser.getAppQuality(this.qualitiesList);

        this.video = this.qualitiesList[q].link;
        this.activeQuality = q;

      }
      else {
        this.video = this.qualitiesList[index].link;
        this.activeQuality = index;
        this.app_ser.updateQuality(this.qualitiesList[index].code);
      }


    }


  }

  ngOnInit() {

  }
  ChangetoggleIcon(id: any) {
    this.toggleIcons[id] = !this.toggleIcons[id];
  }

  viewCourse(course) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["course-view/" + course.code + "/" + this.app_ser.urlString(course.name)]);

  }
  register() {
    if (!this.app_ser.isStudent()) {
      this.app_ser.isStudentLogined().then(res => {
        if (res) {
          this.initData();
        }

      });;
      return;

    }

    this.app_ser.isStudentLogined().then(res => {
      if (res) {
        if (this.courseDetail.summary_video && this.courseDetail.show_summary) {
          this.router.navigate(["free/" + this.courseDetail.code + "/" + this.app_ser.urlString(this.courseDetail.name)]);

          return;
        }
        this.app_ser.openTerms().then(r => {
          if (r) {
            this.addRegister();
          }
        })
      }
    });

  }

  addRegister() {
    if (this.checkStartPayment()) {
      this.showPaymentModal = true;

      this.app_ser.openPaymentGateway(this.courseDetail).then((res) => {
        if (res) {
          // alert(res);
          this.joinWithCourse(res);

        }
        else {
          this.showPaymentModal = false;
        }
      });
    }
    else {
      this.joinWithCourse();
    }


  }

  joinWithCourse(payment = 0) {
    this.app_ser.post("site_feed/userCourse/add_register_with_payment/" + this.courseDetail.id, { payment: payment }).subscribe(
      register => {
        // alert(register.id);
        this.router.navigate(["steps/" + register.id + "/" + this.app_ser.urlString(this.courseDetail.name)]);
      },
      error => {

      });
  }
  checkStartPayment() {

    //kun users
    var user = this.app_ser.getCurrentUser();
    if (user && user.kun_related) {
      return false;
    }

    //free course
    if (!this.courseDetail.price || this.courseDetail.price == "null") {
      return false;
    }


    //unlimited case
    if (!this.courseDetail.repeat_count || this.courseDetail.repeat_count == 0) {
      if (!this.courseDetail.register_count || this.courseDetail.register_count == 0)
        return true;
      else

        return false;
    }


    //course repeat setting
    var m = this.courseDetail.register_count % this.courseDetail.repeat_count
    if (m == 0)
      return true;
    return false


  }


  completeCourse() {
    // alert(this.courseDetail.register.id);
    this.router.navigate(["steps/" + this.courseDetail.register.id + "/" + this.app_ser.urlString(this.courseDetail.name)]);

  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  viewMyCourse(id) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // // this.router.navigate(["my-course/"+id]);
    // this.router.navigate(["steps/" + id]);

  }
  // test.toggle(i){

  // }
  // toggle(){
  //   alert("hellow");
  //   this.toggleIcon = !this.toggleIcon;
  // }
  showSettings() {
    this.settingItem = !this.settingItem;
    this.dubbingContent = false;
  }
  showDubbings() {
    this.qualityContent = false;
    this.dubbingContent = !this.dubbingContent;
  }
  showSubtitle() {
    this.subtitleContent = !this.subtitleContent;
  }
  showQuality() {
    this.dubbingContent = false;
    this.qualityContent = !this.qualityContent;
  }
  checkDubbing() {
    return true;
  }
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {

    });
    // this.api.seekTime(9);
    // this.api.getDefaultMedia().currentTime = 7;
    this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
      if (this.time > 2) {
        this.time = this.time - 2;
      }
      else {
        this.time = 0.1;
      }

      this.api.getDefaultMedia().currentTime = this.time;
    });
    this.api.getDefaultMedia().subscriptions.abort.subscribe(() => {

      this.courseGifLoader = true;
    });
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.courseGifLoader = false;

    });

    this.time = 0;
  }
  getActiveDubbing() {
    if (this.activeDubbing == -1) {
      return 'English'
    }
    else {
      return this.dubbingList[this.activeDubbing].name;
    }
  }
  getActiveQuality() {
    if (this.activeQuality == -1) {
      return '';
    }
    else {
      return this.qualitiesList[this.activeQuality].name;
    }
  }

  // onChangePage(page) {
  //   this.loadPage(page);
  // }
  stopCourseLoader() {
    if (this.api && this.api.getDefaultMedia()) {
      if (this.api.getDefaultMedia().currentTime >= 0.1) {

        this.courseGifLoader = false;
      }

    }
  }
  // showVideoOnOver(course) {
  //   this.courseGifLoader = true;
  //   this.playVideoOnHover = course.register_id;


  // }

  // hideVideoOnOver() {
  //   this.playVideoOnHover = 0
  //   this.courseGifLoader = false;


  // }
  setFavourite(course) {
    this.app_ser.isStudentLogined().then(res => {
      if (res) {

        if (course.is_interested) {
          this.app_ser.post("site_feed/UserCourse/delete_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 0;

            })
        }
        else {
          this.app_ser.post("site_feed/UserCourse/add_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 1;
            })
        }
      }

    });


  }


  // onPlayerReady(api: VgAPI, course) {

  //   api.volume = 0;
  //   this.api = api;
  //   this.api.volume = 0;
  //   course.volume = 0;
  // }
  muteAndPlay(course) {
    this.api.volume = !this.api.volume;
    course.volume = this.api.volume;

  }
  loadRelatedCoursePage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


}

