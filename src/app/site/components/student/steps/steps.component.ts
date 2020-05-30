import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KEY_CODE, stepsInfo, Step, activeStep, Answer, ApplyResultDetails, Model, CourseView, Apply, Item, activeItem } from '../../../../_models/loadData';
import { SharedService } from '../../../../services/shared.service';
import * as RecordRTC from 'recordrtc';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VgAPI, VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ImageUploaderOptions, FileQueueObject } from 'ngx-image-uploader';
import { CountdownComponent } from 'ngx-countdown';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../../../../shared/modals/confirmation-dialog/confirmation-dialog.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';


declare var MediaRecorder: any;
// declare var MediaRecorder= useRef<typeof MediaRecorder | null>(null);
@Component({
  selector: "app-steps",
  templateUrl: "./steps.component.html",
  styleUrls: ["./steps.component.scss"],
  encapsulation: ViewEncapsulation.None
})

export class StepsComponent implements OnInit {
  @ViewChild('recordedVideo', { static: false }) recordVideoElementRef: ElementRef
  @ViewChild('video', { static: false }) videoElementRef: ElementRef
  isRecording = false;
  recordedTime;
  blobUrl;
  blob;
  course_reivew_rate: any[];
  courseReview: string = '';
  courseRating: any = '';
  opacityShowHide: any = 'hideItemSummary';
  opacityShowHideSteps: any = 'hideStepTitle';
  itemMouseOverIndex: any = 0;
  stepMouseOverIndex: any = -1;
  showIcon: boolean = true;
  fullScreen: boolean = true;
  public shouldShow = false;
  public modal: ModalDirective;
  public files: NgxFileDropEntry[] = [];
  public file: NgxFileDropEntry;
  applayResultDetails: ApplyResultDetails;
  activeStep: activeStep;
  oldActiveStep: activeStep;
  saveSteps: any;
  stepsInfo: stepsInfo;
  step: Step;
  courseGifLoader: boolean = false;
  regId: Number;
  itemHash: any;
  apply: Number;
  answers: Answer[];
  stepType: any[];
  toggleIcons: any[];
  api: any;
  timeout_value: any;
  skip_value: any;
  result_modal: Model;

  courseDetail: CourseView;
  active_item: activeItem;
  items: activeItem[];
  active_item_index: any;
  sended: any;
  isShown: boolean = false;
  insideLoaded: boolean = false;
  instructionsBox: boolean = false;
  activeDubbing: any = -1;
  time: any;
  dubbingContent: any = false;
  qualityContent: any = false;
  subtitleContent: any = false;
  langStyle: any;
  qualitiesList: any[];
  activeQuality: any = -1;
  rating_arr: any[];
  showControl: boolean;
  KEY_CODE: KEY_CODE;
  value: any = 0;
  volume: any;
  isSaving: boolean;
  scrollAmount: any = 2;
  fontSize: any = 20;
  marquee: any;


  //video recording
  videoElement: HTMLVideoElement
  recordVideoElement: HTMLVideoElement
  mediaRecorder: any
  recordedBlobs: Blob[]
  isVideoRecording: boolean = false
  downloadUrl: any = ""
  stream: MediaStream
  downloadUrl1: any = "";
  autocueTypes: string[];
  showToolTipSkip: boolean = false;
  toggleTooltipPrev: boolean = false;
  res: any[];
  redTimer: boolean = false;
  yellowTimer: boolean = false;
  soundTimer: boolean = false;
  timeLeft: any = 60;
  constructor(
    private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,

    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private _sharedService: SharedService,
    private modalService: NgbModal,
    private ngFlashMessageService: NgFlashMessageService,
    private translate: TranslateService,
    private ngxService: NgxUiLoaderService
  ) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.blob = data.blob;
    });


    this.KEY_CODE = new KEY_CODE()
    this.fullScreen = this.app_ser.getFullscreenValue();
    this.langStyle = "wrapper-courseInside-lang-" + this.app_ser.app_lang();
    this.time = 0;
    this.volume = 0.5;
    this.apply = 0;
    this.sended = 0;
    this.courseDetail = new CourseView();
    this.active_item = new activeItem();
    this.items = [];
    this.active_item_index = 0;
    this.applayResultDetails = new ApplyResultDetails();
    this.timeout_value = "time_out&^^%%$$#%^%##$##$";
    this.skip_value = "skip_value&^^%%$$#%^%##$##$";
    this.stepType = [
      "play",
      "textbox",
      "choice",
      "correct",
      "arrange",
      "upload-document"
    ];
    this.autocueTypes = ['autocue', 'autocue-voice'];
    this.saveSteps = false;
    this.answers = [];
    this.courseGifLoader = true;
    this.initData();
  }

  ngOnInit() { }
  success(message: string) {
    this.toastr.success("Hello world!", "Toastr fun!");
  }




  initData() {

    this.courseGifLoader = true;

    this.apply = 0;
    this.activeStep = new activeStep();
    this.activeStep.index = 0;
    this.stepsInfo = new stepsInfo();
    this.stepsInfo.student_steps = [];
    this.regId = this.route.snapshot.params['regId'];
    // this.ngxService.stop();
    this.ngxService.start();
    this.app_ser.post("site_feed/UserCourse/view_registered_course/" + this.regId, {}).subscribe(
      data => {
        this.ngxService.stop();
        this.courseDetail = data;
        this.rating_arr = this.app_ser.initStarRating(this.courseDetail.average_rate);
        // this.activeDubbing = this.app_ser.getActiveDubbing(this.activeStep.dubbingList, this.courseDetail.register.dubbing_lang);
        // this.changeDubbing(this.activeDubbing);
        this.courseGifLoader = false;
        this.initItems();
      },
      error => {

      });
  }

  initItems() {

    this.sended = 0;
    this.stepsInfo = new stepsInfo();
    this.stepsInfo.student_steps = [];
    this.applayResultDetails = new ApplyResultDetails();
    this.items = [];
    let ui_item = new activeItem();
    ui_item.index = 0;
    ui_item.type = "course_video";
    this.items.push(ui_item);
    this.active_item = ui_item;
    let select_index = 0;
    let applyed = false;
    let finished = true;
    for (var i = 0; i < this.courseDetail.items.length; i++) {
      let ui_item = new activeItem();
      ui_item.index = i + 1;
      ui_item.item = this.courseDetail.items[i];
      var comp_percent = this.completePercent(this.courseDetail.items[i]);
      if (comp_percent != 100) {
        finished = false;
      }
      if (comp_percent > 0) {
        applyed = true;

        ui_item.completed = true;
        //for by move
        if (comp_percent < 100 && !select_index) {
          select_index = ui_item.index;
          this.apply = this.courseDetail.items[i].apply[this.courseDetail.items[i].apply.length - 1].id;
        }
      }

      this.items.push(ui_item);
      this.active_item_index = this.active_item.index;
    }
    if (finished) {
      this.initFinishCourse();
      return;
    }
    if (select_index) {
      this.active_item = this.items[select_index];
      this.active_item_index = select_index;
      this.initSteps();
      return;
    }
    if (applyed) {
      for (var i = 1; i < this.items.length; i++) {
        if (!this.items[i].completed) {
          this.active_item = this.items[i];
          this.active_item_index = this.items[i].index;
          this.initSteps();
          return;
        }
      }
    }
    this.active_item_index = select_index;
    this.initSteps();
  }
  initSteps() {
    this.activeStep = new activeStep();
    this.activeStep.index = 1;
    if (this.active_item_index == 0) {
      this.active_item_index = 1;
      this.active_item = this.items[this.active_item_index];
      // this.initExtraSteps();
      // return;
    }
    return this.activeItemSteps();
  }
  initFinishCourse() {
    this.activeStep = new activeStep();
    this.course_reivew_rate = this.app_ser.initStarRating(0);
    this.activeStep.index = 1;
    this.activeStep.type = "finish";
  }

  finishCourse() {


    this.confirmationDialogService.confirm(this.translate.instant('Please Confirm ..'), 'finish_course_confirm')
      .then((confirmed) => {

        if (confirmed) {
          this.courseGifLoader = true;
          this.app_ser
            .post("site_feed/UserCourse/finish_course/" + this.regId, {
              review: this.courseReview,
              rating: this.courseRating
            })
            .subscribe(data => {
              this.courseGifLoader = false;
              this.router.navigate(["my-library/completed-courses"]);
            });
        }
      })
      .catch(() => {

      });



  }

  setRate(rating) {
    this.courseRating = rating;
    this.course_reivew_rate = this.app_ser.initStarRating(rating);
  }


  initExtraSteps() {

    this.stepsInfo.student_steps = [];
    this.stepsInfo.steps = [];
    this.activeStep.type = "course-video";
    this.activeStep.step = new Step();
    this.activeStep.step.video = this.courseDetail.video;
    this.activeStep.step.video_derivation = this.courseDetail.video_derivation;
    this.activeStep.index = 0;
    this.activeStep.dubbingList = this.app_ser.getDubbingList(this.activeStep.step.video_derivation);
    this.activeDubbing = this.app_ser.getActiveDubbing(this.activeStep.dubbingList, this.courseDetail.register.dubbing_lang);
    this.changeDubbing(this.activeDubbing, false);
    this.stepsInfo.student_steps.push(this.activeStep);
    var temp_step = new activeStep();
    temp_step.type = "details";
    temp_step.index = 1;
    // this.stepsInfo.student_steps.push(temp_step);
  }

  activeItemSteps() {
    this.courseGifLoader = true;
    this.app_ser.post("site_feed/Item/get_item_info/" + this.regId + "/" + this.active_item.item.last_approved + "/" + this.apply, {}).subscribe(
      data => {
        this.courseGifLoader = false;

        this.insideLoaded = true;
        this.stepsInfo = new stepsInfo();
        this.stepsInfo = data;
        this.stepsInfo.student_steps = [];

        for (var i = 0; i < this.stepsInfo.steps.length; i++) {
          this.stepsInfo.student_steps.push(new activeStep());

        }
        // for complete
        if (this.stepsInfo.start_step_id) {
          for (var i = 0; i < this.stepsInfo.steps.length; i++) {
            if (this.stepsInfo.start_step_id != this.stepsInfo.steps[i].id) {
              this.activeStep = new activeStep()
              this.activeStep.index = i;

              this.activeStep.step = this.stepsInfo.steps[i];
              //ahmad
              this.setOptions();
              this.activeStep.sended = 1;
              this.activeStep.changeable = 0;
              this.stepsInfo.student_steps[i] = this.activeStep;

            }
            else {
              this.activeStep = new activeStep()
              this.activeStep.index = i;
              this.activeStep.step = this.stepsInfo.steps[i];
              this.setOptions();
              break;
            }


          }

        }
        else {
          this.activeStep = new activeStep();
          this.initNext();
        }





      },
      error => {
        // this.alertService.warn("this course finished");
      });
  }

  isVisible = false;
  status = "start";
  @ViewChild("countdown", { static: false }) counter: CountdownComponent;

  finishTest() {
    this.status = "finished";
    setTimeout(() => this.counter.restart(), 1);
  }

  timesUp(event) {
    // alert(event.action)

    if (event.action == "notify") {
      // this.redTimer = true;

    }

    if (event.action == "done") {
      this.soundTimer = false;
      this.timeOut();

      this.status = "finished";
      setTimeout(() => this.counter.restart(), 2000);

      // this.counter.
    }
    if (event.action == "start") {
      this.redTimer = false;
      this.yellowTimer = false;
      this.soundTimer = true;

    }

    if (event.action == "pause") {
      this.soundTimer = false;
      // this.redTimer = false;

    }
    if (event.action == "resume") {
      this.soundTimer = true;
      // this.redTimer = false;

    }


    if (event.left / 1000 > 25 && event.left / 1000 <= 50) {

      this.yellowTimer = true;
    }

    if (event.left / 1000 <= 25) {

      this.redTimer = true;
      this.yellowTimer = false
    }
    else {
      this.redTimer = false;
    }
  }


  // betterUnmute() { if (this.target['muted'] === false) { this.target['muted'] = true; this.API.volume = 0; } else { this.target['muted'] = false; this.API.volume = .5; } }
  setApplay() {
    if (this.active_item.index == 0) {
      if (this.insideLoaded) {
        return this.initData();
      }
      else {
        this.active_item_index = 1;
        this.active_item.index = 1;
        this.active_item = this.items[1];
        this.apply = 0;
        this.activeItemSteps();
        return
      };

      return;
    }
    if (!this.checkSteps()) {
      this.ngFlashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Some steps are't Founded"],
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true,
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: "danger"
      });
      return;
    }
    let data = this.setData();
    this.activeStep = new activeStep();
    if (this.sended) {
      this.initResult();
      return;
    }

    this.ngxService.start();

    this.sended = false;
    this.courseGifLoader = true;

    this.app_ser.post("site_feed/Item/save_answers_by_register/" + this.regId + "/" + this.stepsInfo.item.last_approved + "/" + 0, data).subscribe(
      data => {
        this.ngxService.stop();
        this.courseGifLoader = false;
        this.applayResultDetails = data;
        this.sended = 1;
        if (this.stepsInfo.settings.lesson_show_result || this.stepsInfo.settings.exam_show_result) {
          this.initResult();
        } else { this.activeItem(-1); }


      },
      error => {
        this.ngxService.stop();
      });
  }

  selectCourse(opt) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["course-view/" + opt.code + "/" + this.app_ser.urlString(opt.name)]);
    // this.router.navigate([]).then(result => { window.open("#/course-view/" + opt.code + "/" + this.app_ser.urlString(opt.name), '_blank'); });;


  }

  initNextSaveAnswerOnMove() {

    if (!this.activeStep.sended) {

      if (this.activeStep.type == 'error-video') {

        this.completeAfterShowStepCorrect();
        return;
      }
      let data = this.setData();
      this.ngxService.start();
      this.courseGifLoader = true;

      this.app_ser.post("site_feed/Item/save_step_answer_by_register/" + this.regId + "/" + this.stepsInfo.item.last_approved + "/" + this.apply + "/" + this.activeStep.index, data).subscribe(
        data => {
          this.ngxService.stop();
          this.applayResultDetails = data;
          this.courseGifLoader = false;

          this.apply = this.applayResultDetails.apply_id;
          this.activeStep.changeable = 0;
          this.activeStep.sended = 1;
          this.stepsInfo.student_steps[this.activeStep.index] = this.activeStep;




          // show correct
          if ((this.applayResultDetails.is_correct != null) && (this.stepsInfo.settings.lesson_show_correct || this.stepsInfo.settings.exam_show_correct)) {
            this.showCorrectStepAnswer();
          }
          else {
            this.completeAfterShowStepCorrect();
          }



          // if (this.activeStep.index == this.stepsInfo.student_steps.length - 1) {
          //   if (this.stepsInfo.settings.lesson_show_result || this.stepsInfo.settings.exam_show_result) {
          //     this.apply = 0;
          //     this.initResult();
          //   } else { this.activeItem(-1); }
          //   return;
          // }

          // let index = this.activeStep.index + 1;

          // this.activeStep = new activeStep()

          // this.activeStep.index = index;
          // this.activeStep.step = this.stepsInfo.steps[index];
          // this.setOptions();
          // this.activeStep.start = new Date().getTime();

          // if (this.activeStep.step.type != 'play' && this.activeStep.step.expected_time && this.activeStep.step.force_time) {
          //   this.counter.restart();
          // }
          // return

        }
        ,
        error => {
          this.ngxService.stop();
        });




    }
    else {
      let index = this.activeStep.index + 1;

      if (this.stepsInfo.student_steps[index].index != -1) {
        this.activeStep = this.stepsInfo.student_steps[index];
      }
      else {
        this.activeStep = new activeStep()

        this.activeStep.index = index;
        this.activeStep.step = this.stepsInfo.steps[index];
        this.setOptions();
        this.activeStep.start = new Date().getTime();

      }
      if (this.activeStep.step.type != 'play' && this.activeStep.step.expected_time) {
        this.counter.restart();
      }

    }





  }




  showCorrectStepAnswer() {
    this.activeStep.showResult = true;
    switch (this.activeStep.step.type) {
      case "choice":

        break;

      case "correct":
        // for (var v = 0; v < this.activeStep.data.length; v++) {
        //   if (this.activeStep.data[v]["selected"])
        //     data["data[answer][data][" + v + "]"] = "1";
        // }

        break;


      case "match":

        break;

      case "arrange":

        break;

    }
    return;
  }
  xyz(option) {
    var opt_index = this.activeStep.init_options.indexOf(option);
    return this.applayResultDetails.correct[opt_index].arrange;
    //   for (var i = 0; i < this.applayResultDetails.correct.length; i++) {
    //     if(this.applayResultDetails.correct[i].arrange==opt_index+1){


    //   }
    // }
  }
  completeAfterShowStepCorrect() {

    // if ((this.activeStep.step.navigating) && (this.applayResultDetails.is_correct != null) && (this.stepsInfo.settings.lesson_custom_navigating && !this.applayResultDetails.is_correct)) {

    if ((this.stepsInfo.settings.lesson_custom_navigating || this.stepsInfo.settings.exam_custom_navigating) && this.activeStep.step.navigating && !this.applayResultDetails.is_correct) {
      this.initErrorVideo();
      return;
    }

    if (this.activeStep.index == this.stepsInfo.student_steps.length - 1) {
      if (this.stepsInfo.settings.lesson_show_result || this.stepsInfo.settings.exam_show_result) {
        this.apply = 0;
        this.initResult();
      } else { this.activeItem(-1); }
      return;
    }

    let index = this.activeStep.index + 1;

    this.activeStep = new activeStep()

    this.activeStep.index = index;
    this.activeStep.step = this.stepsInfo.steps[index];
    this.setOptions();
    this.activeStep.start = new Date().getTime();

    if (this.activeStep.step.type != 'play' && this.activeStep.step.expected_time) {
      this.counter.restart();
    }
    return
  }

  initErrorVideo() {

    // this.stepsInfo.student_steps = [];
    // this.stepsInfo.steps = [];
    this.courseGifLoader = true;
    this.oldActiveStep = this.activeStep;
    this.activeStep = new activeStep();

    this.activeStep.type = "error-video";
    this.activeStep.step = new Step();
    this.activeStep.step.video = this.oldActiveStep.step.navigating;
    this.activeStep.step.video_derivation = this.oldActiveStep.step.navigating_video_derivation;
    this.activeStep.skip = false;
    // this.activeStep.sended = true;
    this.activeStep.index = this.oldActiveStep.index;
    this.activeStep.dubbingList = this.app_ser.getDubbingList(this.activeStep.step.video_derivation);
    this.activeDubbing = this.app_ser.getActiveDubbing(this.activeStep.dubbingList, this.courseDetail.register.dubbing_lang);
    this.changeDubbing(this.activeDubbing);
    // this.stepsInfo.student_steps.push(this.activeStep);


    // this.stepsInfo.student_steps.push(temp_step);
  }
  initResult() {
    this.res = [];
    this.activeStep = new activeStep();
    this.activeStep.type = "result";
    this.activeStep.index = 0;
    this.stepsInfo.student_steps = [];
    this.stepsInfo.student_steps.push(this.activeStep);

  }
  activeItem(i) {
    if (i < 0) {
      // i = this.active_item_index + 1;
      this.initData();
      return;
    }


    // this.itemMouseOverIndex = i;
    this.confirmationDialogService.confirm(this.translate.instant('Please Confirm ..'), this.translate.instant('Do you really want moving to another item?'))
      .then((confirmed) => {

        if (confirmed) {

          this.dubbingContent = false;
          this.qualityContent = false;

          // this.itemMouseOverIndex = i;
          this.active_item_index = i;
          this.active_item = this.items[i];
          if (i > 0) {
            var comp_percent = this.completePercent(this.courseDetail.items[i - 1]);
            if (comp_percent > 0 && comp_percent < 100) {
              this.apply = this.courseDetail.items[i - 1].apply[this.courseDetail.items[i - 1].apply.length - 1].id;
            }
            else {
              this.apply = 0;
            }
          }
          else {
            this.apply = 0;
            this.insideLoaded = true;
          }

          this.initSteps();
        }
      })
      .catch(() => {

      });
    // if(i<0){
    //   i=this.active_item_index+1;
    //   this.initData();
    //   return;
    // }

    // this.active_item_index=i;
    // this.active_item=this.items[i];
    // this. initSteps() ;
  }

  changeItem(i) {
    if (i < 0) {
      i = this.active_item_index + 1;
      this.initData();
      return;
    }

    this.active_item_index = i;
    this.active_item = this.items[i];
    this.initSteps();
  }

  setAnswer(timeout = false) {
    if (this.activeStep.showResult) {
      this.completeAfterShowStepCorrect();
      return;
    }
    this.activeStep.end = new Date().getTime();
    this.activeStep.isAnswer = true;
    this.activeStep.timeout = timeout;
    this.stepsInfo.student_steps[this.activeStep.index] = this.activeStep;
    this.initNext();
  }

  initNext() {

    this.showToolTipSkip = false;
    this.toggleTooltipPrev = false;


    if (this.activeStep.index < this.stepsInfo.student_steps.length) {
      if (this.activeStep.index > -1) {
        //save answe on move
        if (this.active_item.item && this.active_item.item.settings && this.active_item.item.settings.save_answers_on_move) {
          return this.initNextSaveAnswerOnMove()
        }
        this.stepsInfo.student_steps[this.activeStep.index] = this.activeStep;

      }

      if (this.activeStep.index == this.stepsInfo.student_steps.length - 1) {
        this.setApplay();
        return;
      }

      let index = this.activeStep.index + 1;
      if (this.stepsInfo.student_steps[index].index != -1) {
        this.activeStep = this.stepsInfo.student_steps[index];
      }
      else {
        this.activeStep = new activeStep()
        this.activeStep.index = index;
        this.activeStep.step = this.stepsInfo.steps[index];
        this.setOptions();
        this.activeStep.start = new Date().getTime();
      }
      if (
        this.activeStep.step.type != "play" &&
        this.activeStep.step.expected_time

      ) {
        this.counter.restart();
      }



      return;
    }
    if (this.active_item.item && this.active_item.item.settings && this.active_item.item.settings.save_answers_on_move) {
      return this.initNextSaveAnswerOnMove()
    }
    this.setApplay();
  }
  fullScreenSwitch() {
    this.fullScreen = !this.fullScreen;
    this.app_ser.updateFullscreen(this.fullScreen);
  }
  skip() {
    if (this.canSkip()) {
      this.activeStep.end = new Date().getTime();
      this.activeStep.skip = true;

      this.initNext();
    }
  }
  timeOut() {
    // if (this.canSkip()) {
    this.activeStep.end = new Date().getTime();
    this.activeStep.timeout = true;
    this.initNext();
    // }
  }

  previous() {

    if (this.canPrevious()) {
      this.activeStep = this.stepsInfo.student_steps[this.activeStep.index - 1];
    }
  }

  setOptions() {
    let data = this.activeStep.step.options;
    switch (this.activeStep.step.type) {
      case "play":
        // var values: any[] = this.app_ser.getDubbingList(this.activeStep.step.video_derivation, this.courseDetail.register.dubbing_lang)

        this.api = null;
        this.activeStep.dubbingList = this.app_ser.getDubbingList(this.activeStep.step.video_derivation);
        this.activeDubbing = this.app_ser.getActiveDubbing(this.activeStep.dubbingList, this.courseDetail.register.dubbing_lang);
        this.changeDubbing(this.activeDubbing);
        break;


      case "textbox":
        if (this.stepsInfo.answers[this.activeStep.step.id] && this.stepsInfo.answers[this.activeStep.step.id][i] != this.skip_value && this.stepsInfo.answers[this.activeStep.step.id][i] != this.timeout_value) {
          this.activeStep.data = this.stepsInfo.answers[this.activeStep.step.id];
        }

        break;

      case "autocue-voice":
        this.changeMarqueeSpeed();

        break;

      case "autocue":
        this.changeMarqueeSpeed();


        break;

      case "correct":
        this.activeStep.data = [];
        for (var i = 0; i < data.length; i++) {
          this.activeStep.data[i] = [];
          this.activeStep.data[i]["option"] = data[i].t;
          if (Array.isArray(this.stepsInfo.answers[this.activeStep.step.id]) && this.stepsInfo.answers[this.activeStep.step.id].includes(i)) {
            // if (this.stepsInfo.answers[this.activeStep.step.id] && this.stepsInfo.answers[this.activeStep.step.id][i] > -1 && this.stepsInfo.answers[this.activeStep.step.id][i] != this.skip_value && this.stepsInfo.answers[this.activeStep.step.id][i] != this.timeout_value) {
            this.activeStep.data[i]["selected"] = true;
          }
          else {
            this.activeStep.data[i]["selected"] = false;
          }
        }


        break;

      case "match":
        this.activeStep.data = [];

        if (Array.isArray(this.stepsInfo.answers[this.activeStep.step.id])) {
          for (var i = 0; i < data.length; i++) {
            this.activeStep.data[i] = [];
            let x = this.stepsInfo.answers[this.activeStep.step.id][i] - 1;
            this.activeStep.data[i]["question"] = data[x].t;
            this.activeStep.data[i]["selected"] = x;
            this.activeStep.init_options.push(data[x].o);
            this.activeStep.options.push(data[x].o);
          }
        }
        else {

          for (var i = 0; i < data.length; i++) {
            this.activeStep.data[i] = [];
            this.activeStep.data[i]["question"] = data[i].t;
            this.activeStep.data[i]["selected"] = i;
            this.activeStep.init_options.push(data[i].o);
            this.activeStep.options.push(data[i].o);

          }
        }

        break;
      case "arrange":
        this.activeStep.data = [];


        if (this.stepsInfo.answers[this.activeStep.step.id] && Array.isArray(this.stepsInfo.answers[this.activeStep.step.id])) {
          for (var i = 0; i < data.length; i++) {
            this.activeStep.data[i] = [];
            let x = this.stepsInfo.answers[this.activeStep.step.id][i] - 1;
            this.activeStep.init_options.push(data[x].t);
            this.activeStep.options.push(data[x].t);
          }
        }
        else {
          for (var i = 0; i < data.length; i++) {
            this.activeStep.data[i] = [];
            this.activeStep.init_options.push(data[i].t);
            this.activeStep.options.push(data[i].t);
          }
        }

        break;
      case "choice":
        this.activeStep.data = [];
        this.activeStep.selected = -1;
        for (var i = 0; i < data.length; i++) {
          this.activeStep.data[i] = [];
          this.activeStep.data[i]["option"] = data[i].t;



          if (this.stepsInfo.answers[this.activeStep.step.id] > -1 && this.stepsInfo.answers[this.activeStep.step.id][i] != this.skip_value && this.stepsInfo.answers[this.activeStep.step.id][i] != this.timeout_value) {
            this.activeStep.data[i]["selected"] = true;
            this.activeStep.selected = this.stepsInfo.answers[this.activeStep.step.id];
            this.activeStep.data[i]["check"] = "materialChecked";
          }
          else {
            this.activeStep.data[i]["selected"] = false;
            this.activeStep.data[i]["check"] = "materialUnchecked";
          }




        }

        break;

      default:
        if (this.stepsInfo.answers[this.activeStep.step.id] && this.stepsInfo.answers[this.activeStep.step.id][i] != this.skip_value && this.stepsInfo.answers[this.activeStep.step.id][i] != this.timeout_value) {
          this.activeStep.data = this.stepsInfo.answers[this.activeStep.step.id];
        }

    }
  }
  canSkip() {
    if (this.activeStep.step && this.activeStep.step.skip) {
      return true;
      // if (this.activeStep.index < this.stepsInfo.steps.length - 1) {
      //   return true;
    }
    return false;
  }
  canPrevious() {
    // return true;

    if (this.activeStep.step && this.activeStep.index > 0) {
      if (this.active_item.item && this.active_item.item.settings && !(this.active_item.item.settings.exam_no_back || this.active_item.item.settings.lesson_no_back)) {

        return true;
      }

    }
    return false;
  }

  videoStep(index, mode = "next") {
    if (mode == "next") {
      for (var c = index + 1; c < this.stepsInfo.steps.length; c++) {
        if (this.stepType.includes(this.stepsInfo.steps[c].type)) return c;
      }
      this.setApplay();
    }

    if (mode == "previous") {
      for (var c: any = index - 1; c > -1; c--) {
        if (this.stepType.includes(this.stepsInfo.steps[c].type)) return c;
      }
    }

    // this.router.navigate(["my-course/" + this.regId]);
  }
  setData() {
    let data = [];
    if (this.active_item.item && this.active_item.item.settings && this.active_item.item.settings.save_answers_on_move) {

      // alert(this.activeStep.skip);
      data["data[answer][seconds]"] = Math.round((this.activeStep.end - this.activeStep.start) / 1000);
      data["data[answer][id]"] = this.activeStep.step.id;
      if (this.activeStep.skip) {
        data["data[answer][data]"] = this.skip_value;
        return data
      }
      if (this.activeStep.timeout) {
        data["data[answer][data]"] = this.timeout_value;
      }
      switch (this.activeStep.step.type) {
        case "play":
          data["data[answer][data]"] = "";
          break;

        case "choice":

          if (this.activeStep.isAnswer || this.activeStep.timeout) {
            data["data[answer][data]"] = this.activeStep.selected;

          }

          break;
        case "correct":

          if (this.activeStep.isAnswer || this.activeStep.timeout) {

            for (var v = 0; v < this.activeStep.data.length; v++) {
              if (this.activeStep.data[v]["selected"])
                data["data[answer][data][" + v + "]"] = "1";
            }
          }

          break;
        case "match":

          if (this.activeStep.isAnswer || this.activeStep.timeout) {
            for (var v = 0; v < this.activeStep.options.length; v++) {
              var opt_index = this.activeStep.init_options.indexOf(this.activeStep.options[v]);
              data["data[answer][data][" + v + "]"] = opt_index + 1;
            }
          }

          break;

        case "arrange":

          if (this.activeStep.isAnswer || this.activeStep.timeout) {
            for (var v = 0; v < this.activeStep.options.length; v++) {
              var opt_index = this.activeStep.init_options.indexOf(this.activeStep.options[v]);
              data["data[answer][data][" + v + "]"] = opt_index + 1;
            }

          }
          break;
        default:
          if (this.activeStep.data)
            data["data[answer][data]"] = this.activeStep.data;

      }
      return data;
    }


    for (var i = 0; i < this.stepsInfo.steps.length; i++) {
      if (this.stepsInfo.student_steps[i].index !== -1) {
        data[
          "data[answers][" +
          this.stepsInfo.student_steps[i].index +
          "][seconds]"
        ] = Math.round(
          (this.stepsInfo.student_steps[i].end -
            this.stepsInfo.student_steps[i].start) /
          1000
        );
        data[
          "data[answers][" + this.stepsInfo.student_steps[i].index + "][id]"
        ] = this.stepsInfo.student_steps[i].step.id;
        data[
          "data[answers][" +
          this.stepsInfo.student_steps[i].index +
          "][data]"
        ] = "";
        if (this.stepsInfo.student_steps[i].skip) {
          data[
            "data[answers][" +
            this.stepsInfo.student_steps[i].index +
            "][data]"
          ] = this.skip_value;
          continue;
        }
        if (this.stepsInfo.student_steps[i].timeout) {
          data[
            "data[answers][" +
            this.stepsInfo.student_steps[i].index +
            "][data]"
          ] = this.timeout_value;
        }
        switch (this.stepsInfo.student_steps[i].step.type) {
          case "play":
            data[
              "data[answers][" +
              this.stepsInfo.student_steps[i].index +
              "][data]"
            ] = "";
            break;

          case "choice":


            if (this.stepsInfo.student_steps[i].isAnswer || this.stepsInfo.student_steps[i].timeout) {
              data[
                "data[answers][" +
                this.stepsInfo.student_steps[i].index +
                "][data]"
              ] = this.stepsInfo.student_steps[i].selected;
            }

            break;
          case "correct":

            if (this.stepsInfo.student_steps[i].isAnswer || this.stepsInfo.student_steps[i].timeout) {
              for (
                var v = 0;
                v < this.stepsInfo.student_steps[i].data.length;
                v++
              ) {
                if (this.stepsInfo.student_steps[i].data[v]["selected"])
                  data[
                    "data[answers][" +
                    this.stepsInfo.student_steps[i].index +
                    "][data][" +
                    v +
                    "]"
                  ] = "1";
              }
            }

            break;
          case "match":

            if (this.stepsInfo.student_steps[i].isAnswer || this.stepsInfo.student_steps[i].timeout) {
              for (
                var v = 0;
                v < this.stepsInfo.student_steps[i].options.length;
                v++
              ) {
                var opt_index = this.stepsInfo.student_steps[
                  i
                ].init_options.indexOf(
                  this.stepsInfo.student_steps[i].options[v]
                );
                data[
                  "data[answers][" +
                  this.stepsInfo.student_steps[i].index +
                  "][data][" +
                  v +
                  "]"
                ] = opt_index + 1;
              }
            }

            break;

          case "arrange":

            if (this.stepsInfo.student_steps[i].isAnswer || this.stepsInfo.student_steps[i].timeout) {
              for (
                var v = 0;
                v < this.stepsInfo.student_steps[i].options.length;
                v++
              ) {
                var opt_index = this.stepsInfo.student_steps[
                  i
                ].init_options.indexOf(
                  this.stepsInfo.student_steps[i].options[v]
                );
                data[
                  "data[answers][" +
                  this.stepsInfo.student_steps[i].index +
                  "][data][" +
                  v +
                  "]"
                ] = opt_index + 1;
              }
            }
            break;
          default:
            if (this.stepsInfo.student_steps[i].data)
              data["data[answers][" + this.stepsInfo.student_steps[i].index + "][data]"] = this.stepsInfo.student_steps[i].data;

        }
      }
    }
    return data;
  }

  checkSteps() {
    for (var i = 0; i < this.stepsInfo.steps.length; i++) {
      if (this.stepsInfo.student_steps[i].index == -1) return false;
    }
    return true;
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.ngxService.start();
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          var allowedExtensions = [];


          var ext = file.name.split('.').pop();

          let type = "attachment";

          switch (this.activeStep.step.type) {
            case "upload-image":
              allowedExtensions = this.app_ser.appropriateExtension('image');
              type = "image";
              break;


            case "upload-document":
              allowedExtensions = this.app_ser.appropriateExtension('file');
              type = "attachment";
              break;

            case "upload-video":
              allowedExtensions = this.app_ser.appropriateExtension('video');
              type = "video";
              break;
            case "video":
              allowedExtensions = this.app_ser.appropriateExtension('video');
              type = "video";
              break;
            case "autocue":
              allowedExtensions = this.app_ser.appropriateExtension('video');
              type = "video";
              break;


            case "upload-sound":
              allowedExtensions = this.app_ser.appropriateExtension('audio');
              type = "audio";
              break;
            case "sound":
              allowedExtensions = this.app_ser.appropriateExtension('audio');
              type = "audio";
              break;

            default:
          }
          if (allowedExtensions.indexOf(ext) !== -1) {
            this.courseGifLoader = true;
            this.counter.pause();
            this.app_ser
              .post("site_feed/media/addfile/" + type, { file: file })
              .subscribe(
                data => {
                  this.courseGifLoader = false;
                  this.activeStep.enabled = true;
                  this.activeStep.files = [];
                  this.activeStep.isAnswer = true;
                  this.activeStep.files.push(droppedFile);
                  this.activeStep.data = data.uuid;
                  this.counter.resume();
                  this.ngxService.stop();
                },
                error => {
                }
              );
          }
          else {
            this.ngxService.stop();
            // this.showFileErrorMessage(this.activeStep.step.type);
            this.toastr.error(this.translate.instant('uploadExtensionError') + ' ' + allowedExtensions.toString(), this.translate.instant('error'));


          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)

        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  // showFileErrorMessage(type){
  //   switch (type) {
  //     case "upload-image":
  //         this.toastr.error(this.translate.instant('uploadExtensionError'), this.translate.instant('error'));
  //       break;

  //     case "upload-video":
  //         this.toastr.error(this.translate.instant('uploadVideoError'), this.translate.instant('error'));

  //       break;
  //     case "video":
  //         this.toastr.error(this.translate.instant('uploadVideoError'), this.translate.instant('error'));
  //       break;
  //     case "video-autocue":
  //         this.toastr.error(this.translate.instant('uploadVideoError'), this.translate.instant('error'));
  //       break;


  //     case "upload-sound":
  //         this.toastr.error(this.translate.instant('uploadSoundError'), this.translate.instant('error'));
  //       break;
  //     case "sound":
  //         this.toastr.error(this.translate.instant('uploadSoundError'), this.translate.instant('error'));
  //       break;

  //     default:
  // }
  // }

  public deleteMedia() {
    this.activeStep.files = [];
    this.activeStep.data = "";
    this.activeStep.enabled = false;
    this.activeStep.isAnswer = false;
    this.counter.resume();
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }

  ////////

  answer = []; //don't delete this, there is a ghost!!!!
  questoins = [
    { value: "هذا هو الخيار 1", disabled: true },
    { value: "هذا هو الخيار 2", disabled: true },
    { value: "هذا هو الخيار 3", disabled: true },
    { value: "هذا هو الخيار 4", disabled: true }
  ];

  emptyArray = [
    // 'هذا هو الخيار 1',
    // 'هذا هو الخيار 2',
    // 'هذا هو الخيار 3',
    // 'هذا هو الخيار 4',
  ];

  match_options = [
    "هذا هو الخيار 1",
    "هذا هو الخيار 2",
    "هذا هو الخيار 3",
    "هذا هو الخيار 4"
  ];

  result_data = [
    {
      q_no: 1,
      question:
        "وعند موافقه العميل المبدئيه على التصميم يتم ازالة هذا النص من التصميم ويتم وضع النصوص النهائية المطلوبة للتصميم ويقول البعض",
      marks: "8"
    },
    {
      q_no: 2,
      question:
        " هذا النص من التصميم ويتم وضع النصوص النهائية المطلوبة للتصميم ويقول البعض",
      marks: "7"
    },
    {
      q_no: 3,
      question:
        "وعند موافقه العميل المبدئيه على التصميم يتم ازالة هذا النص من التصميم ويتم وضع",
      marks: "3"
    },
    {
      q_no: 4,
      question: "التصميم ويتم وضع النصوص النهائية المطلوبة للتصميم ويقول البعض",
      marks: "9"
    },
    {
      q_no: 5,
      question: "يتم ازالة هذا النص من التصميم ويتم وضع النصوص النهائية ",
      marks: "10"
    }
  ];

  dropQ(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questoins, event.previousIndex, event.currentIndex);
  }
  onFinished() {
  }

  dropA(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.activeStep.options,
      event.previousIndex,
      event.currentIndex
    );
  }

  matchOpts(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.activeStep.options,
      event.previousIndex,
      event.currentIndex
    );
  }

  onOpened(event: any) {
  }
  imageOptions: ImageUploaderOptions = {
    uploadUrl:
      "https://fancy-image-uploader-demo.azurewebsites.net/api/demo/upload",
    cropEnabled: false,
    thumbnailResizeMode: "fill",
    autoUpload: false,
    resizeOnLoad: false
  };

  onUpload(file: FileQueueObject) {
  }
  showModal() {
    // this.modal=new ModalDirective(,,,,);
    this.modal.show();
    // this.modal.open();
    // this.modal.open('custom-modal-1')
  }

  getData() {
    this.result_modal = new Model();
    this.result_modal.id = 1;
    this.result_modal.name = "Abdul";
    this.isVisible = true;
    return this.result_modal;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }


  ///////////for my course

  ChangetoggleIcon(id: any) {
    this.toggleIcons[id] = !this.toggleIcons[id];
  }
  checkItem(item) {
    if (item.apply === undefined || item.apply.length == 0) {
      return 0;
    }
    if (item.apply[item.apply.length - 1].status == 2) return 0;

    return 1;
  }

  currentResult(item) {
    var index = item.apply.length - 1;
    if (index == -1)
      return "InProgress1";
    var apply: any = item.apply[item.apply.length - 1];
    if (!apply.apply_marks) return "InProgress";
    if (apply.total_marks)
      return Math.round((100 * apply.apply_marks) / apply.total_marks) + " % ";
    return "100 %";
  }
  completePercent(item, index = 0) {
    // if (this.itemMouseOverIndex && this.itemMouseOverIndex == this.active_item_index)
    //   return this.activeItemPercent();
    if (item.apply === undefined || item.apply.length == 0) {
      return 0;
    }

    return item.apply[item.apply.length - 1].complete
  }

  completePercentHtml(item, index = 0) {
    if (this.itemMouseOverIndex && this.itemMouseOverIndex == this.active_item_index)
      return this.activeItemPercent();
    if (item.apply === undefined || item.apply.length == 0) {
      return 0;
    }

    return item.apply[item.apply.length - 1].complete
  }
  activeItemPercent() {
    return Math.round(100 * this.activeStep.index / this.courseDetail.items[this.active_item_index - 1].steps_count);
  }
  canOpenSteps(index) {

    if (this.courseDetail.items[index].apply_repeat && this.courseDetail.items[index].apply.length >= this.courseDetail.items[index].apply_repeat) {
      if (this.courseDetail.items[index].apply[this.courseDetail.items[index].apply.length - 1].status == 1)
        return true;
      return false
    }
    if (this.courseDetail.is_ordering && index) {
      for (var i = index - 1; i > -1; i--) {
        if (
          this.courseDetail.items[i].is_basic &&
          this.completePercent(this.courseDetail.items[i]) != 100
        )
          return false;
      }
    }

    return true;
  }
  steps(item) {
    this._sharedService.reg_id = this.regId;
    this._sharedService.item_hash = item.last_approved;
    this._sharedService.apply = item.apply.length
      ? item.apply[item.apply.length - 1].id
      : 0;
    this.router.navigate(["course-inside/" + this.regId]);
  }

  showCourseDetail(event) {
    if (this.isShown) {
      event.srcElement.classList.add("full-height");
      event.srcElement.classList.remove("zero-height");
    } else {
      event.srcElement.classList.remove("full-height");
      event.srcElement.classList.add("zero-height");
    }
    this.isShown = !this.isShown;
  }
  stepLessonLastItemsClass(index) {
    var l = 10;
    var length = this.items.length;
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
  changeStyle($event: any, itemMouseOverIndex) {
    if ($event.type == 'mouseenter') {
      this.opacityShowHide = this.stepLessonLastItemsClass(itemMouseOverIndex);
      this.itemMouseOverIndex = itemMouseOverIndex;
    }
    else {
      this.opacityShowHide = 'hideItemSummary' + ' ' + this.stepLessonLastItemsClass(itemMouseOverIndex);
      this.stepMouseOverIndex = -1;
    }
    // this.opacityShowHide = ($event.type == 'mouseenter') ? ((itemMouseOverIndex > this.items.length / 2) ? 'lastLessonItem' : 'showItemSummary') : 'hideItemSummary';
    // this.itemMouseOverIndex = itemMouseOverIndex;
  }
  // showHideStepTitle($event: any, itemMouseOverIndex) {
  //   this.opacityShowHide = ($event.type == 'mouseenter') ? ((itemMouseOverIndex > this.items.length / 2) ? 'lastLessonItem' : 'showItemSummary') : 'hideItemSummary';
  //   this.itemMouseOverIndex = itemMouseOverIndex;
  // }
  // changeStyle($event: any, itemMouseOverIndex) {
  //   this.opacityShowHide = ($event.type == 'mouseenter') ? 'showItemSummary' : 'hideItemSummary';
  //   this.itemMouseOverIndex = itemMouseOverIndex;
  // }
  // showStepTitle($event: any, stepMouseOverIndex) {
  //   this.opacityShowHideSteps = ($event.type == 'mouseenter') ? 'showStepTitle' : 'hideStepTitle';
  //   this.stepMouseOverIndex = stepMouseOverIndex;
  // }
  stepTitleLastItemsClass(index) {
    var l = 20;
    var length = this.stepsInfo.student_steps.length;
    if (length > l) {
      if (index > length - 8) {
        return 'last4StepsTitle'
      }
      else {
        return 'title-hover-step'
      }
    }
    else {
      return 'title-hover-step'
    }
  }
  showStepTitle($event: any, stepMouseOverIndex) {
    if ($event.type == 'mouseenter') {
      this.opacityShowHideSteps = 'showStepTitle' + ' ' + this.stepTitleLastItemsClass(stepMouseOverIndex);
      this.stepMouseOverIndex = stepMouseOverIndex;
    }
    else {
      this.opacityShowHideSteps = 'hideStepTitle' + ' ' + this.stepTitleLastItemsClass(stepMouseOverIndex);
      this.stepMouseOverIndex = -1;
    }

    // this.opacityShowHideSteps = ($event.type == 'mouseenter') ? 'showStepTitle' : 'hideStepTitle';
    // this.stepMouseOverIndex = stepMouseOverIndex;
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
  // abc() {

  //   if (this.activeStep && this.activeStep.step) {
  //     if (this.activeStep.step.type == 'play')
  //       return false;
  //     if (this.activeStep.step.type == 'course-video') {
  //       return false;
  //     }

  //   }


  //   return true
  // }

  onPlayerReady(api: VgAPI) {


    this.showControl = false;

    this.api = api;
    // this.api.seekTime(9);
    // this.api.getDefaultMedia().currentTime = 7;
    this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {

      // this.showControl = true;
      if (this.api.getDefaultMedia().currentTime >= 0.5) {
        this.showControl = true;
      }
      this.courseGifLoader = false;
      if (this.time > 2) {
        this.time = this.time - 2;
      }
      else {
        this.time = 0.1;
      }

      this.api.getDefaultMedia().currentTime = this.time;
      this.api.volume = this.volume;
      // if (this.activeStep.step.type == "play")
      // this.ngxService.stopLoader('loader-01')

    });

    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (this.api && this.api.getDefaultMedia()) {
        this.volume = this.api.volume;
      }
      if (this.activeStep.type == 'error-video') {
        this.completeAfterShowStepCorrect();
        return
      }
      this.activeStep.end = new Date().getTime();
      this.activeStep.isAnswer = true;
      this.time = 0;
      this.stepsInfo.student_steps[this.activeStep.index] = this.activeStep;
      this.initNext();
    });
    this.api.getDefaultMedia().subscriptions.abort.subscribe(() => {

      // this.courseGifLoader = true;
    });
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(() => {
      this.courseGifLoader = false;

    });



    this.time = 0;
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
  setSound() {
    if (this.api.volume == 1) {
      this.api.volume = 0;
      return
    }
    this.api.volume = 1;
  }
  handlePlayer() {
    if (this.shouldShow) {
      this.api.pause();
      return;
    }

    this.api.volume = .9;
    this.api.play();


  }

  changeDubbing(index, changeDubbingMode = true) {
    this.showControl = false;

    // this.ngxService.start();
    // if (index == this.activeDubbing)
    //   return;

    if (this.api && this.api.getDefaultMedia()) {
      this.time = this.api.getDefaultMedia().currentTime;
      this.volume = this.api.volume;
    }

    else
      this.time = 0;


    this.activeDubbing = index;
    if (index == -1) {
      this.activeStep.video = this.activeStep.step.video;
      this.activeStep.video_derivation = this.activeStep.step.video_derivation;
      if (changeDubbingMode)
        this.changeDubbingLang("default")
    }
    else {
      this.activeStep.video = this.activeStep.dubbingList[index].link;
      // this.activeStep.video_derivation = null;

      this.activeStep.video_derivation = this.activeStep.step.video_derivation.dubbings[this.activeStep.dubbingList[index].code + '_video_derivation'];

      if (changeDubbingMode)
        this.changeDubbingLang(this.activeStep.dubbingList[index].code)
    }
    this.activeDubbing = index;
    this.qualitiesList = [];
    this.qualitiesList = this.app_ser.getQualityList(this.activeStep.video_derivation);
    this.changeQuality(-1, 1)

    // this.ngxService.stop();

  }

  changeQuality(index, mode = null) {
    this.showControl = false;

    if (this.qualitiesList.length) {
      if (!mode) {
        if (this.api && this.api.getDefaultMedia()) {
          this.time = this.api.getDefaultMedia().currentTime;
          this.volume = this.api.volume;
        }

        else
          this.time = 0
      }

      if (index == -1) {
        var q = this.app_ser.getAppQuality(this.qualitiesList);
        this.activeStep.video = this.qualitiesList[q].link;
        this.activeQuality = q;

      }
      else {
        this.activeStep.video = this.qualitiesList[index].link;
        this.activeQuality = index;
        this.app_ser.updateQuality(this.qualitiesList[index].code);
      }


    }


  }
  changeDubbingLang(lang) {
    if (this.courseDetail.register.dubbing_lang == lang)
      return

    this.ngxService.startLoader('loader-01')
    this.courseGifLoader = true;

    this.app_ser.post("site_feed/UserCourse/change_dubbing_lang/" + this.courseDetail.register.id + "/" + lang, {}).subscribe(
      data => {
        this.courseGifLoader = false;
        this.courseDetail.register.dubbing_lang = lang;
      })
  }
  setInstructionsBox() {
    this.instructionsBox = !this.instructionsBox;
    return true;
  }


  //KEYBORD CONTROL
  // @HostListener('window:keyup', ['$event'])
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // alert(event.keyCode)
    // event.stopImmediatePropagation()
    // event.preventDefault();
    // event.stopPropagation();
    if (event.keyCode === this.KEY_CODE.RIGHT_ARROW) {
      event.preventDefault();
      this.incrementVideoTime();
    }

    if (event.keyCode === this.KEY_CODE.LEFT_ARROW) {
      event.preventDefault();
      this.decrementVideoTime();
    }


    if (event.keyCode === this.KEY_CODE.UP_ARROW) {
      event.preventDefault();
      this.incrementVideoVoice();
    }


    if (event.keyCode === this.KEY_CODE.DOWN_ARROW) {
      event.preventDefault();
      this.decrementVideoVoice();
    }

    if (event.keyCode === this.KEY_CODE.SPACE) {
      // event.stopImmediatePropagation()
      // event.preventDefault();
      // event.stopPropagation();
      this.switchPausePlay();
    }

    if (event.keyCode === this.KEY_CODE.ENTER) {
      this.enterButton();
    }

    if (event.keyCode === this.KEY_CODE.ESC) {
      this.fullScreen = false;
      this.app_ser.updateFullscreen(this.fullScreen);
    }

  }
  enterButton() {



    if (!this.activeStep.step.type) {
      if (this.activeStep.type == 'course-video') {
        return this.fullScreenSwitch();
      }

      if (this.activeStep.type == 'error-video') {
        return this.fullScreenSwitch();
      }
      if (this.activeStep.type == 'finish') {

        // return this.finishCourse();
      }
      if (this.activeStep.type == 'result') {
        return this.activeItem(-1);
      }

      return this.fullScreenSwitch();

    }

    if (this.activeStep.step.type) {
      switch (this.activeStep.step.type) {

        case "play":
          this.fullScreenSwitch();
          break;
        case "textbox":
          if (this.checkNextBtn())
            this.setAnswer();
          break;


        case "choice":
          if (this.checkNextBtn())
            this.setAnswer();
          break;

        case "correct":
          if (this.checkNextBtn())
            this.setAnswer();
          break;


        case "match":
          this.setAnswer();
          break;

        case "arrange":
          this.setAnswer();
          break;

        case "upload-document":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;




        case "upload-sound":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;




        case "video":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;

        case "video-autocue":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;

        case "sound":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;
        case "autocue-voice":
          if (this.activeStep.enabled || !this.activeStep.changeable)
            this.setAnswer();
          break;
      }
    }

  }
  checkNextBtn(step = null) {
    var tempStep: activeStep;
    if (step) {
      tempStep = step;
    }
    else {
      tempStep = this.activeStep;
    }
    switch (tempStep.step.type) {

      case "play":

        break;
      case "textbox":

        if (tempStep.data)
          return true
        return false;
        break;


      case "choice":
        if (tempStep.showResult)
          return true;
        if (tempStep.selected > -1)
          return true
        return false;

        break;

      case "correct":
        if (tempStep.showResult)
          return true;
        for (var i = 0; i < tempStep.data.length; i++) {
          if (tempStep.data[i]["selected"])
            return true
        }
        return false
        break;


      case "match":
        if (tempStep.showResult)
          return true;

        return true;
        break;

      case "arrange":
        if (tempStep.showResult)
          return true;

        return true;
        break;
        break;

      case "upload-document":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;

        break;

      case "upload-image":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;

        break;





      case "upload-sound":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;
        break;

      case "upload-video":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;
        break;



      case "video":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;
        break;

      case "autocue":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;
        break;

      case "sound":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;

        break;
      case "autocue-voice":
        if (tempStep.enabled || !tempStep.changeable)
          return true;

        return false;
        break;


    }

    return false


  }
  incrementVideoTime() {
    if (this.api && this.api.getDefaultMedia()) {
      this.api.getDefaultMedia().currentTime = this.api.getDefaultMedia().currentTime + 5;
    }

  }

  decrementVideoTime() {
    if (this.api.getDefaultMedia().currentTime - 5 > 0)
      this.api.getDefaultMedia().currentTime = this.api.getDefaultMedia().currentTime - 5;
    else
      this.api.getDefaultMedia().currentTime = 0;
  }

  incrementVideoVoice() {
    if (this.api && this.api.getDefaultMedia() && this.api.volume < 1) {
      this.api.volume = this.api.volume + 0.1;
      this.volume = this.api.volume;
    }

  }

  decrementVideoVoice() {
    if (this.api && this.api.getDefaultMedia() && this.api.volume > 0) {
      this.api.volume = this.api.volume - 0.1;
      this.volume = this.api.volume;
    }
  }

  switchPausePlay() {

    if (this.api && this.api.getDefaultMedia()) {
      if (this.api.state == 'paused') {
        this.api.play();

      }
      else {
        this.api.pause();
      }

    }

  }



  // RECORDING FUNCTIONS
  uploadRecordFile(type = 'audio') {

    if (this.blob) {
      this.isSaving = true;
      this.courseGifLoader = true;
      this.app_ser
        .post("site_feed/media/addfile/" + type, { file: this.blob })
        .subscribe(
          data => {
            this.isSaving = false;
            this.courseGifLoader = false;
            this.activeStep.enabled = true;
            this.activeStep.files = [];
            this.activeStep.isAnswer = true;
            this.activeStep.data = data.uuid;
            this.clearRecordedData();
          },
          error => {
            this.courseGifLoader = false;
          }
        );
    }
  }

  startRecording(media = 'audio', marquee = true) {
    if (!this.isRecording) {
      this.isRecording = true;
      if (marquee)
        this.startMarquee('soundMarquee');
      this.audioRecordingService.startRecording(media);
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording(media = 'audio', marquee = true) {
    if (this.isRecording) {
      this.counter.pause();
      this.audioRecordingService.stopRecording(media);
      this.isRecording = false;
      this.isSaving = false;
      if (marquee)
        this.stopMarquee()
    }
  }

  clearRecordedData() {

    this.counter.resume();
    this.blobUrl = null;
    this.blob = null
    this.isVideoRecording = false;
    this.downloadUrl = ""
    this.recordedBlobs = [];
    this.stream = null;


  }

  ngOnDestroy(): void {
    this.abortRecording();
  }



  //
  changeFontSize(mode = '+') {
    // alert(mode)
    if (mode === '+') {
      this.fontSize++;
    }
    else {
      this.fontSize--;
    }
  }

  changeMarqueeSpeed(mode = '') {

    if (this.autocueTypes.includes(this.activeStep.step.type)) {
      // this.marquee = $('.soundMarquee').marquee();

      if (mode === '+') {
        this.scrollAmount = this.scrollAmount + 0.5;
        if (this.scrollAmount > 20) {
          this.scrollAmount = 20;
        }

      }
      if (mode === '-') {

        this.scrollAmount = this.scrollAmount - 0.5;
        if (this.scrollAmount < 1) {
          this.scrollAmount = 0.5;
        }

      }
      // document.getElementById('soundMarquee')
      setTimeout(() => {
        (<any>document.getElementById('soundMarquee')).setAttribute('scrollamount', '' + this.scrollAmount);
        this.startMarquee('soundMarquee');
      }, 100);



    }

  }
  startMarquee(marquee = 'soundMarquee') {

    if (this.autocueTypes.includes(this.activeStep.step.type)) {
      (<any>document.getElementById(marquee)).start();
    }


  }
  reStartMarquee(marquee = 'soundMarquee') {
    if (this.autocueTypes.includes(this.activeStep.step.type)) {
      (<any>document.getElementById(marquee)).stop();
      (<any>document.getElementById(marquee)).start();
    }

  }
  marqueeFinished() {
    alert("finished")
  }
  stopMarquee(marquee = 'soundMarquee') {
    // <HTMLInputElement>document.getElementById(marquee).start();
    if (this.autocueTypes.includes(this.activeStep.step.type)) {
      (<any>document.getElementById(marquee)).stop();
    }

  }



  getActiveDubbing() {
    if (this.activeDubbing == -1) {
      return 'English'
    }
    else {
      return this.activeStep.dubbingList[this.activeDubbing].name;
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


  startVideoRecording() {
    this.downloadUrl = null
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 360
      },
      audio: true
    }).then(stream => {
      setTimeout(() => {

        this.videoElement = this.videoElementRef.nativeElement
        this.stream = stream
        this.stream.getTracks().forEach(function (track) {


        })
        this.videoElement.srcObject = this.stream
        // this.videoElement.setAttribute("muted", "true");
        this.videoElement.muted = true;

        this.startVideo();
        // this.recordVideoElement = this.recordVideoElementRef.nativeElement
      }, 100);

    }).catch(err => {
      this.toastr.error(this.translate.instant('Requested device not found'), this.translate.instant('error'));
      return
    })

  }

  startVideo() {
    this.recordedBlobs = []
    let options: any = { mimeType: 'video/webm' }

    try {

      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        options = { mimeType: 'video/webm; codecs=vp9' };
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        options = { mimeType: 'video/webm; codecs=vp8' };
      }

      this.mediaRecorder = new MediaRecorder(this.stream, options)
      this.mediaRecorder.ignoreMutedMedia = true;
    } catch (err) {

      return
    }

    this.mediaRecorder.start() // collect 100ms of data

    this.startMarquee();


    this.mediaRecorder.ignoreMutedMedia = true;
    this.isVideoRecording = !this.isVideoRecording
    this.onDataAvailableEvent()
    this.onStopRecordingEvent()
  }

  stopVideoRecording() {
    this.mediaRecorder.stop()
    this.counter.pause();
    this.isVideoRecording = !this.isVideoRecording

    this.videoElement.srcObject = null
    this.isVideoRecording = false;
    this.isSaving = false;
    this.courseGifLoader = true;
    this.downloadUrl = null;
    setTimeout(() => {
      if (this.autocueTypes.includes(this.activeStep.step.type)) {
        this.startMarquee();
      }



    }, 100);

  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      return
    }
    this.recordVideoElement.play()
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data)

          // const videoBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' })
          // this.downloadUrl1 =this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(videoBuffer)); // you can download with <a> tag

        }
      }
    } catch (error) {
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' })

        this.downloadUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(videoBuffer)); // you can download with <a> tag
        this.blob = videoBuffer;
        this.courseGifLoader = false;

        this.stream.getTracks().forEach(function (track) {
          track.stop();

        })
      }
    } catch (error) {
    }
  }


  toggleSkip($event: any) {
    this.showToolTipSkip = !this.showToolTipSkip;
    return;
  }

  togglePrev($event: any) {
    this.toggleTooltipPrev = !this.toggleTooltipPrev;
    return;
  }

}
