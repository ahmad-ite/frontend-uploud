import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppService } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Step } from 'src/app/_models/loadData';
import { Textbox, Choice, StepCategory, Arrange, Match, Correct, Play, SoundRecording, VideoRecording, Autocue, AutocueVoice, UploadVideo, UploadSound, UploadDocument, UploadImage, SelectCourse } from 'src/app/trainer/models/stepModel';
import { ToolsService } from 'src/app/trainer/services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  newOption: any = [];
  langStyle: any;
  step: Step;

  itemId: number;
  stepId: number;
  itemStep: Step;
  itemSteps: any[];
  title: string;
  onTabChange(tab) {

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  constructor(
    public app_ser: AppService,
    public tool_ser: ToolsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.langStyle = "wrapper-steps-management-" + this.app_ser.app_lang();
    this.stepCatogories = this.tool_ser.initTools();
    this.step=new Step();
    this.initStep('textbox');

    this.itemId = parseInt(this.route.snapshot.params['itemId'] ? this.route.snapshot.params['itemId'] : 0);
    this.reloadSteps();
    // this.step.question = 'Hi this is tesigng';
  }

  insertStep(type){
    this.step=new Step();
    this.initStep(type);
  }
  initStep(type=null){

    let tempStep: any;
    switch (type) {
      case "textbox":
       tempStep=new Textbox();
       break;
      case "choice":
          tempStep=new Choice();
        break;
      case "correct":
        tempStep=new Correct();
      break;
      case "arrange":
          tempStep=new Arrange();

        break;


      case "match":
          tempStep=new Match();
        break;

      

        case "play":
          tempStep=new Play();
        break;


        case "sound":
          tempStep=new SoundRecording();
        break;


        case "video":
          tempStep=new VideoRecording();
        break;


        case "autocue":
          tempStep=new Autocue();
        break;

        case "autocue-voice":
          tempStep=new AutocueVoice();
        break;

        case "upload-video":
          tempStep=new UploadVideo();
        break;

        
        

        case "upload-sound":
            tempStep=new UploadSound();
          break;
          case "upload-document":
              tempStep=new UploadDocument();
            break;
            case "upload-image":
                tempStep=new UploadImage();
              break;

              case "select-course":
                  tempStep=new SelectCourse();
                break;
              

    }
    Object.assign(this.step,tempStep)
  }

  ngOnInit() {
    console.log("iniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit");
  }

  public reloadSteps() {
    console.log(this.itemId);
    if (!! this.itemId && this.itemId != 0) {
      this.app_ser.post("site_feed/TrainerStep/steps/" + this.itemId, {}).subscribe(
        data => {
          this.itemSteps = data.rows;
          this.onChangeStep();
        },
        error => {
        });
    }else {
      this.itemSteps= [];
    }
  }

  public onChangeStep() {
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
  }

  addOption() {
    this.choiceOptions.push(this.newOption);
  }
  removeOption(opt) {
    this.choiceOptions.splice(opt, 1);
  }
  formatTimeInMinutes(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours:any = Math.floor(sec / 3600); // get hours
    let minutes:any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds:any = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
  }
  
  
}
