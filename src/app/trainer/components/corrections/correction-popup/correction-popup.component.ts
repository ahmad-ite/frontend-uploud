

import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { Socialusers } from '../../../../_models/socialusers'
import { SocialloginService } from '../../../../services/sociallogin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Correction, Course, Student } from 'src/app/_models/loadData';

@Component({
  selector: 'app-correction-popup',
  templateUrl: './correction-popup.component.html',
  styleUrls: ['./correction-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CorrectionPopupComponent implements OnInit {
  langStyle: any;
  @Input() correctionData: Correction;
  @Input() studentData: Student;
  @Input() courseData: Course;
  answer: any;
  ansMark: number = null;
  skipedTimeOutOpt: boolean;
  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.langStyle = "wrapper-correction-popup-" + this.app_ser.app_lang();

  }

  ngOnInit() {
    // this.correctionData.mark = 0;
    this.skipedTimeOutOpt = true;
    if (!this.correctionData.data || this.correctionData.data == 'undefined') {
      this.correctionData.data = null;
      this.skipedTimeOutOpt = false;
      this.answer = this.translate.instant('No Answer');
      this.ansMark = 0;
    }


    switch (this.correctionData.type) {
      case "autocue":
        this.correctionData.news = this.correctionData.question
        this.correctionData.question = 'Video Autocue Test';

        break;

      case "autocue-voice":
        this.correctionData.news = this.correctionData.question
        this.correctionData.question = 'Voice Autocue Test';

        break;
    }
    
    //  JSON.parse(this.correctionData.data, (key, value)=>{
    
    //   this.correctionData.data = value;

    //   });
    this.initAnswer();
  }
  initAnswer() {

    switch (this.correctionData.data) {
      case "time_out&^^%%$$#%^%##$##$":
        this.skipedTimeOutOpt = false;
        this.answer = this.translate.instant('timeoutAnswer');
        break;
      case "skip_value&^^%%$$#%^%##$##$":
        this.skipedTimeOutOpt = false;
        this.answer = this.translate.instant('skipAnswer');
        this.ansMark = 0;

        break;

      default:
        if (this.correctionData.data) {
          this.answer = this.correctionData.data;
          this.ansMark = this.correctionData.mark;
        }


    }
  }
  usrImg() {

    if (this.studentData.image) {
      return this.app_ser.img_url(this.studentData.image, 'user')
    }
    if (this.studentData.image_url) {
      return this.studentData.image_url;
    }
    return this.app_ser.img_url(this.studentData.image, 'user')

  }
  setMark({ value, valid }) {
    // alert(this.ansMark);
    if (!this.checked({ value, valid })) {
      this.toastr.error(this.translate.instant('Enter marks'), this.translate.instant('error'));

      return

    }
    // this.app_ser.post("site_feed/TrainerCourse/set_mark/" + this.courseData.id + "/" + this.correctionData.item + "/" + this.correctionData.apply_id + "/" + this.correctionData.id + "/" + this.ansMark, {}).subscribe(

    this.app_ser.post("site_feed/TrainerCourse/add_mark/" + this.correctionData.id + "/" + this.ansMark, {}).subscribe(

      res => {
        this.activeModal.close('true')

      });

  }
  change(change) {
    alert(change)
  }
  checked({ value, valid }) {
    if (!valid || this.ansMark < 0 || this.ansMark > this.correctionData.mark)
      return false;
    return true;
  }

}
