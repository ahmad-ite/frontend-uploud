import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppService } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Step } from 'src/app/_models/loadData';
import { Textbox, Choice, StepCategory, Arrange, Match, Correct, Play, SoundRecording, VideoRecording, Autocue, AutocueVoice, UploadVideo, UploadSound, UploadDocument, UploadImage, SelectCourse } from 'src/app/trainer/models/stepModel';
import { ToolsService } from 'src/app/trainer/services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VgAPI } from 'videogular2/compiled/core';
import { ConfirmationDialogService } from 'src/app/shared/modals/confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-steps-management',
  templateUrl: './steps-management.component.html',
  styleUrls: ['./steps-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepsManagementComponent implements OnInit {

  range: any = 0;
  min = 0;
  max = 100;
  stepTitle: string;
  onRangeValueChange(event: any) {
    const value = event.value;
    this.range = value;
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  activeTab: any = "";
  stepCatogories: StepCategory[];

  thumbnails = [];
  choiceOptions = ["الاختيار الأول", "الاختيار الثاني", "الاختيار الثالث", "الاختيار الرابع"];
  langStyle: any;
  step: Step;

  //@Input() itemId: number;
  // stepId: number;
  // itemStep: Step;
  itemSteps = [];
  itemId: number = 0;
  @Input() courseId: number;

  @Input() itemId1: number;
  title: string;
  correctAnswers: number[];
  stepIcons = {
    'textbox': 'fa-text-size',
    'play': 'fa-tv',
    'choice': 'fa-list-alt',
    'correct': 'fa-clipboard-list-check',
    'arrange': 'fa-sort-alt',
    'match': 'fa-clone',
    'upload-video': 'fa-file-video'
  };
  stepWrapperClasses = {
    'textbox': 'wrapper-insert-text',
    'play': 'wrapper-play',
    'choice': 'wrapper-choice',
    'correct': 'wrapper-correct',
    'arrange': 'wrapper-arrange',
    'match': 'wrapper-match',
    'upload-video': 'wrapper-upload-video'
  };


  constructor(
    public app_ser: AppService,
    public tool_ser: ToolsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router
  ) {
    this.langStyle = "wrapper-steps-management-" + this.app_ser.app_lang();
    this.stepCatogories = this.tool_ser.initTools();
    this.step = new Step();

  }
  onTabChange(tab) {

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {

      var s = event.container.data[event.previousIndex];
      var newIndex = event.currentIndex + 1;

      this.app_ser.post("site_feed/TrainerStep/re_arrange_step/" + s["id"] + "/" + newIndex, {}).subscribe(
        data => {
          this.reloadSteps(s["course_item"]);

        },
        error => {
        });
    }

  }
  dropArrange(event: CdkDragDrop<string[]>) {
    console.log("Event", event
    )

  }

  insertStep(type) {
    this.stepTitle = 'Add Step'
    this.step = new Step();
    this.initStep(type);
  }
  editStep(step1) {
    this.stepTitle = 'Edit Step'
    const step = JSON.parse(JSON.stringify(step1))
    this.step = new Step();
    this.correctAnswers = [];


    switch (step.type) {

      case "choice":
        if (step.options) {
          step.options = JSON.parse(step.options);
          let correct = JSON.parse(step.correct);
          correct.forEach((c, i) => {
            if (c.correct) {
              this.correctAnswers.push(i);
            }
          });
        }
        break;

      case "correct":
        if (step.options) {
          step.options = JSON.parse(step.options);
          let correct = JSON.parse(step.correct);
          correct.forEach((c, i) => {
            if (c.correct) {
              this.correctAnswers.push(1);
            }
            else {
              this.correctAnswers.push(0);
            }
          });
        }
        break;
      case "arrange":


        break;


      case "match":

        break;



      case "play":

        break;


      case "sound":

        break;


      case "video":

        break;


      case "autocue":

        break;

      case "autocue-voice":

        break;

      case "upload-video":

        break;






    }



    Object.assign(this.step, step);
    console.log("this.step", this.step);
    console.log("this.correctAnswers", this.correctAnswers);
  }
  initStep(type = null) {
    this.correctAnswers = [];
    let tempStep: any;
    switch (type) {
      case "textbox":
        tempStep = new Textbox();
        break;
      case "choice":
        tempStep = new Choice();
        this.correctAnswers = [0];
        break;
      case "correct":
        this.correctAnswers = [1, 0, 0, 0];
        tempStep = new Correct();
        break;
      case "arrange":
        tempStep = new Arrange();

        break;


      case "match":
        tempStep = new Match();
        break;



      case "play":
        tempStep = new Play();
        break;


      case "sound":
        tempStep = new SoundRecording();
        break;


      case "video":
        tempStep = new VideoRecording();
        break;


      case "autocue":
        tempStep = new Autocue();
        break;

      case "autocue-voice":
        tempStep = new AutocueVoice();
        break;

      case "upload-video":
        tempStep = new UploadVideo();
        break;




      case "upload-sound":
        tempStep = new UploadSound();
        break;
      case "upload-document":
        tempStep = new UploadDocument();
        break;
      case "upload-image":
        tempStep = new UploadImage();
        break;

      case "select-course":
        tempStep = new SelectCourse();
        break;


    }
    Object.assign(this.step, tempStep);
    this.step.course_item = this.itemId;
    this.step.arrange = this.itemSteps.length + 1;
  }

  ngOnInit() {

  }
  onPlayerReady(api: VgAPI) {

  }
  public reloadSteps(itemId, showNewStep = true) {

    this.itemId = itemId;
    if (itemId) {
      this.itemId = itemId;
      this.app_ser.post("site_feed/TrainerStep/steps/" + itemId, {}).subscribe(
        data => {
          this.itemSteps = data.rows;

        },
        error => {
        });
    } else {
      this.itemSteps = [];
    }
    if (showNewStep)
      this.initStep('textbox');
  }
  selectVideo() {
    this.app_ser.openGalleryPopup(0, 'video', "select").then(res => {
      if (res) {

        this.step.video = res.uuid;
      }

    })
  }

  /* public onChangeStep() {
    if (!!this.stepId && this.stepId != 0) {
      this.title = "Edit Step";
      this.app_ser.post("site_feed/TrainerStep/row/" + this.stepId, {}).subscribe(
        data => {
          this.itemStep = data;
        },
        error => {
        });
    }else {
      this.itemStep= new Step();
      this.itemStep.course_item = this.itemId;
      this.stepId = 0;
    }
  } */

  addOption() {
    if (this.step.options.length < 5)
      switch (this.step.type) {
        case "choice":
          this.step.options.push({ "t": "اختيار جديد" });
          break;

        case "correct":
          this.step.options.push({ "t": "اختيار جديد" });
          this.correctAnswers.push(0)

          break;


        case "match":

          break;

        case "arrange":
          this.step.options.push({ "t": "اختيار جديد" });
          break;

      }


  }
  removeOption(index) {
    switch (this.step.type) {
      case "choice":
        this.step.options.splice(index, 1);
        break;

      case "correct":
        this.step.options.splice(index, 1);
        this.correctAnswers.splice(index, 1);

        break;


      case "match":

        break;

      case "arrange":
        this.step.options.splice(index, 1);
        break;

    }


  }
  formatTimeInMinutes(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours: any = Math.floor(sec / 3600); // get hours
    let minutes: any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds: any = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  }

  save() {

    var copyStep: any = this.initInput();
    this.app_ser.post("site_feed/TrainerStep/save/" + (this.step.id ? this.step.id : 0), { data: copyStep }).subscribe(
      data => {

        // this.toastr.success("Step: " + this.step.title + ", added succesfully", "Cool!");
        if (this.step.id) {
          this.toastr.success("added succesfully", "Cool!");
        }
        else {
          this.toastr.success("edit succesfully", "Cool!");
        }
        this.reloadSteps(this.step.course_item, false);
      });

  }
  initInput() {
    if (this.step.type == "play" && !this.step.video)
      this.toastr.error(this.translate.instant('Error Video'), this.translate.instant('error'));


    return;
    var copyStep: any = Object.assign({}, this.step)
    let sett = { file_types: [], file_message: [] };
    let att = { files: [] };
    switch (this.step.type) {
      case "choice":
        if (copyStep.options) {
          let corr = copyStep.options.map((v, i) => {
            return { "correct": (this.correctAnswers.includes(i)) };
          });
          copyStep.correct = JSON.stringify(corr);
          copyStep.options = JSON.stringify(copyStep.options);
        }
        break;

      case "correct":
        if (copyStep.options) {
          let corr = copyStep.options.map((v, i) => {
            return { "correct": (this.correctAnswers[i] ? true : false) };
          });
          copyStep.correct = JSON.stringify(corr);
          copyStep.options = JSON.stringify(copyStep.options);
        }
        break;


      case "match":

        break;

      case "arrange":

        break;



    }
    copyStep.settings = JSON.stringify(sett);
    copyStep.attachment = JSON.stringify(att);
    console.log("copyStep", copyStep);
    return copyStep;


  }

  removeStep(s) {
    this.confirmationDialogService.confirm(this.translate.instant('Delete Step'), 'Do you want to delete this Step?')
      .then((confirmed) => {

        if (confirmed) {
          this.app_ser.post("site_feed/TrainerStep/delete/" + s.id, {}).subscribe(
            data => {

              this.toastr.success("Step: " + s.title + ", deleted succesfully", "Cool!");
              this.reloadSteps(this.step.course_item);
            });
        }
      })
      .catch(() => {

      });




  }





}
