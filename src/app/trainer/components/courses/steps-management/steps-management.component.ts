import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppService } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Step } from 'src/app/_models/loadData';
import { Textbox, Choice, StepCategory, Arrange, Match, Correct, Play, SoundRecording, VideoRecording, Autocue, AutocueVoice, UploadVideo, UploadSound, UploadDocument, UploadImage, SelectCourse } from 'src/app/trainer/models/stepModel';
import { ToolsService } from 'src/app/trainer/services/tools.service';

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
  step: Step;
  stepCatogories: StepCategory[];
  onTabChange(tab) {

  }
  steps = [
    {
      question: 'هذا هو السؤال وهمية'
    }
  ]
  thumbnails = [
    {
      no: 1,
      name: "thumbnail"
    },
    {
      no: 2,
      name: "thumbnail"
    },
    {
      no: 3,
      name: "thumbnail"
    },
    {
      no: 4,
      name: "thumbnail"
    },
    {
      no: 5,
      name: "thumbnail"
    },
    {
      no: 6,
      name: "thumbnail"
    },
    {
      no: 7,
      name: "thumbnail"
    },
    {
      no: 8,
      name: "thumbnail"
    },
    {
      no: 9,
      name: "thumbnail"
    },
    {
      no: 10,
      name: "thumbnail"
    }


  ];
  choiceOptions = ["الاختيار الأول", "الاختيار الثاني", "الاختيار الثالث", "الاختيار الرابع"];
  newOption: any = [];
  langStyle: any;

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
  ) {
    this.langStyle = "wrapper-steps-management-" + this.app_ser.app_lang();
    this.stepCatogories = this.tool_ser.initTools();
    this.step=new Step();
    this.initStep('textbox');


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
