import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
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
import { SignUpComponent } from '../../../../site/components/registration/sign-up/sign-up.component';
import { TrainerSignupComponent } from '../../../../site/components/registration/trainer-signup/trainer-signup.component';
import { User, Trainer, InputTrainer, TrainerDoc, Details } from '../../../../_models/loadData';
import { ViewPdfComponent } from '../../../modals/view-pdf/view-pdf.component';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerProfileComponent implements OnInit {
  langStyle: any;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  user: Trainer;
  signUpForm: FormGroup;
  templateChecked: any;
  trainer: Trainer;
  inputTrainer: InputTrainer;
  id: any;
  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    public OAuth: AuthService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SocialloginService: SocialloginService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.langStyle = "wrapper-trainer-profile-" + this.app_ser.app_lang();
    this.trainer = new Trainer();
    this.inputTrainer = new InputTrainer();
    this.initTrainer();
  }

  ngOnInit() {
  }
  // initTrainer(){
  //   this.app_ser.post("site_feed/Account/view/", {}).subscribe(
  //     data => {

  //    this.trainer = data.user;
  //    if(!this.trainer.nationality){
  //     this.trainer.nationality = null;
  //    }
  //    if(!this.trainer.residence){
  //     this.trainer.residence = null;
  //    }
  //    if(!this.trainer.demonstration_video){
  //     this.trainer.demonstration_video = new TrainerDoc();
  //    }
  //    if(!this.trainer.training_video){
  //     this.trainer.training_video = new TrainerDoc();
  //    }
  //    if(!this.trainer.signature){
  //     this.trainer.signature = new TrainerDoc();
  //    }
  //    if(!this.trainer.cv){
  //     this.trainer.cv = new TrainerDoc();
  //    }
  //    if(!this.trainer.bankDetail){
  //     this.trainer.bankDetail = new Details();
  //    }
  //     },
  //     error => {


  //     });
  // }
  initTrainer() {
    this.id = this.route.snapshot.params['id'];
    this.app_ser.post("site_feed/Account/view/" + this.id, {}).subscribe(
      data => {

        this.trainer = data.user;
        


        if (!this.trainer.demonstration_video) {
          this.trainer.demonstration_video = new TrainerDoc();
        }
        if (!this.trainer.training_video) {
          this.trainer.training_video = new TrainerDoc();
        }
        if (!this.trainer.trainer_signature) {
          this.trainer.trainer_signature = new TrainerDoc();
        }
        if (!this.trainer.cv) {
          this.trainer.cv = new TrainerDoc();
        }
        if (!this.trainer.bank_details) {
          this.trainer.bank_details = new Details();
        }

      },
      error => {
        


      });
  }

  onPlayerReady(api: VgAPI) { }

  showPdf(path) {
    var pdfModal = this.modalService.open(ViewPdfComponent, { windowClass: 'view-pdf', size: 'lg', centered: true });
    pdfModal.componentInstance.path = path;
  }
  editProfile() {
    this.router.navigate(['/update-profile/' + this.trainer.id + "/" + this.app_ser.urlString(this.trainer.name)]);
  }

}





