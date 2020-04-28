import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';


import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KEY_CODE, stepsInfo, Step, activeStep, Answer, ApplyResultDetails, Model, CourseView, Apply, Item, activeItem } from '../../../../_models/loadData';
import { VgAPI } from 'videogular2/compiled/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-steps-summary',
  templateUrl: './steps-summary.component.html',
  styleUrls: ['./steps-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class StepsSummaryComponent implements OnInit {
  langStyle: any;
  courseDetail: CourseView;
  activeStep: activeStep;
  api: any;
  showControl: boolean;
  time: number;
  courseGifLoader: boolean = true;
  volume: any;
  dubbingContent: any = false;
  qualityContent: any = false;
  subtitleContent: any = false;
  activeDubbing: any = -1;
  activeQuality: any = -1;
  qualitiesList: any[] = [];
  courseCode: any;
  stepsSummary: any;
  summaryVideo: string;
  dubbingList: any[] = [];
  video_derivation: any;
  rating_arr: any[];
  video: any;
  showMsg: boolean = false;

  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ngxService: NgxUiLoaderService,
  ) {
    this.langStyle = "wrapper-steps-summary-" + this.app_ser.app_lang();
    this.courseCode = this.route.snapshot.params['courseCode'];
    this.initData();
  }
  initData() {
    this.ngxService.start();
    this.courseGifLoader = true;
    this.app_ser.post("site_feed/course/view_course_by_code/" + this.courseCode, {}).subscribe(
      data => {
        this.courseGifLoader = false;
        this.ngxService.stop();
        this.courseDetail = data;
        this.video = this.courseDetail.summary_video;
        this.video_derivation = this.courseDetail.summary_video_derivation;
        this.dubbingList = this.app_ser.getDubbingList(this.courseDetail.summary_video_derivation);
        var arabicIndex = this.app_ser.getDubbingLangIndex(this.dubbingList);
        this.changeDubbing(arabicIndex);

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
      this.video = this.courseDetail.summary_video;
      this.video_derivation = this.courseDetail.summary_video_derivation;


    }
    else {
      this.video = this.dubbingList[index].link;
      this.video_derivation = this.courseDetail.summary_video_derivation.dubbings[this.dubbingList[index].code + '_video_derivation'];
    }


    this.activeDubbing = index;
    this.qualitiesList = [];
    this.qualitiesList = this.app_ser.getQualityList(this.video_derivation);
    this.changeQuality(-1, 1)
  }
  changeQuality(index, mode = null) {
    if (this.qualitiesList) {
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
  showVideoControl() {
    if (this.api && this.api.getDefaultMedia()) {
      if (this.api.getDefaultMedia().currentTime >= 0.2) {
        this.showControl = true;
      }

    }
    else {
      this.showControl = false;
    }
  }
  onPlayerReady(api: VgAPI) {
    this.api = api;
    // this.api.seekTime(9);
    // this.api.getDefaultMedia().currentTime = 7;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {


      this.showMsg = true;

      this.time = 0;

    });
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
  onPlayerReady1(api: VgAPI) {


    this.showControl = false;

    this.api = api;

    // this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {


    //   if (this.api.getDefaultMedia().currentTime >= 0.5) {
    //     this.showControl = true;
    //   }
    //   this.courseGifLoader = false;
    //   if (this.time > 2) {
    //     this.time = this.time - 2;
    //   }
    //   else {
    //     this.time = 0.1;
    //   }



    // });

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (this.api && this.api.getDefaultMedia()) {
        this.volume = this.api.volume;
      }


      this.time = 0;

    });
    this.api.getDefaultMedia().subscriptions.abort.subscribe(() => {

      // this.courseGifLoader = true;
    });
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.courseGifLoader = false;

    });



    this.time = 0;
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
  addToFavourite() {
    this.app_ser.isStudentLogined().then(res => {
      this.app_ser.post("site_feed/UserCourse/add_interested/" + this.courseDetail.id, {}).subscribe(
        data => {
          this.router.navigate(["/"]);

        })

    })
  }
}
