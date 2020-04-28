import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { User, Trainer } from '../../../../_models/loadData'
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { Socialusers } from '../../../../_models/socialusers'
import { SocialloginService } from '../../../../services/sociallogin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainerProfileSetupComponent } from '../../../../shared/components/trainer/trainer-profile-setup/trainer-profile-setup.component';


@Component({
  selector: 'app-trainer-signup',
  templateUrl: './trainer-signup.component.html',
  styleUrls: ['./trainer-signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerSignupComponent implements OnInit {
  @Input() signup: any;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  signUpForm: FormGroup;
  langStyle: any;
  templateChecked: any;
  trainer: Trainer;
  emailChecked: boolean;
  emailLoader: boolean = false;
  loader: boolean;



  constructor(
    // public captchaComponent: CaptchaComponent,
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
    // public dialogRef: MatDialogRef<SignUpComponent>,

    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.trainer = new Trainer();
    this.emailChecked = false;
    this.templateChecked = false;
    this.langStyle = "wrapper-lang-trainer-signup-" + this.app_ser.app_lang();
    this.trainer.is_trainer = 1;
    // this.trainer.origin = 'mobile';
  }



  ngOnInit() {


    this.addRecaptchaScript();
    this.templateChecked = 0;
    // this.captchaComponent.captchaEndpoint =
    // 'https://your-app-backend-hostname.your-domain.com/botdetect-captcha-lib/simple-botdetect.php';

    

    // this.signUpForm = this.formBuilder.group({
    //   name : ['', Validators.required],
    //   // password: ['', Validators.required]
    // });
    // this.user.name = this.dialogService.test;
  }

  addRecaptchaScript() {

    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }

    (function (d, s, id, obj) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptcha(); return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

  renderReCaptcha() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey': '6LfkxsoUAAAAAHozOpy65WelxOmpSwCRG7WWL4ua',
      'callback': (response) => {
        
        this.trainer.captcha = response;
      }
    });
  }
  // Process the form on submit event.



  checked({ value, valid }) {
    if (!valid || !this.templateChecked || !this.trainer.captcha)
      return false;
    return true;
  }
  register({ value, valid }) {

    // return;

    if (!this.checked({ value, valid })) {

      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));

      return
    }
    this.loader = true;
    this.app_ser.post("site_feed/account/sign_up", { data: this.trainer }).subscribe(
      data => {
        // this.dialogRef.close()
        this.modalService.dismissAll();
        if (data && data.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('currentUser', JSON.stringify(data));

        }
        if (data && data.email) {
          this.activeModal.close(true);
          this.app_ser.openEmailAuthentication(data.email);
          return

        }

        this.loader = false;
      },
      error => {
        this.loader = false;
      }

    );



  }

  terms() {
    this.templateChecked = !this.templateChecked;
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
  closeSignUpModal() {
    this.modalService.dismissAll();
  }


  changeEmail() {
    this.emailChecked = false;
    this.trainer.code = "";
  }

  authEmail() {
    this.emailLoader = true;
    // setTimeout(() => {
    //   this.emailChecked = true;
    //   this.emailLoader = false;
    // }, 3000);
    // return;
    if (this.trainer.email) {
      this.app_ser.post("site_feed/account/auth_by_email", { email: this.trainer.email }).subscribe(
        data => {
          this.emailChecked = true;
          this.emailLoader = false;
          // this.toastr.success(this.translate.instant('register successfully'), this.translate.instant('Welcome') + " " + data.name);
        },
        err => {
          // this.toastr.error(this.translate.instant(err), this.translate.instant('error'));
          this.emailLoader = false;
        });

    }

  }
}

