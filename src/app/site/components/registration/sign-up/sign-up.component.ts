import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { User, Student } from '../../../../_models/loadData'
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../services/app.service';
import { KeyValue } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { CaptchaComponent } from 'angular-captcha';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  @Input() signup: any;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  user: Student;
  signUpForm: FormGroup;
  langStyle: any;
  templateChecked: any;
  emailChecked: boolean;
  emailLoader: boolean = false;
  loader: boolean;
  hasErrorPhone: boolean = true;

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
    this.templateChecked = false;
    this.emailChecked = false;
    this.langStyle = "wrapper-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {

    this.user = new Student();
    this.user.nationality = null
    this.addRecaptchaScript();
    this.user.is_trainer = 0;
    this.templateChecked = 0;

  }
  terms() {
    this.templateChecked = !this.templateChecked;
  }

  setTemplateChecked(templateChecked) {
    this.templateChecked = !templateChecked;
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
        this.user.captcha = response;
      }
    });
  }
  // Process the form on submit event.



  checked({ value, valid }) {
    if (!valid || !this.user.phone || this.hasErrorPhone || !this.templateChecked || !this.user.captcha)
      return false;
    return true;
  }
  register({ value, valid }) {

    if (!this.checked({ value, valid })) {
      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));
      return
    }
    this.loader = true;
    console.log("user", this.user);

    this.app_ser.post("site_feed/account/sign_up", { data: this.user }).subscribe(
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

        }
        this.loader = false;
      },
      error => {
        this.loader = false;
      }

    );


  }

  changeEmail() {
    this.emailChecked = false;
    this.user.code = "";
    this.emailLoader = false;
  }

  authEmail() {
    this.emailLoader = true;
    // setTimeout(() => {
    //   this.emailChecked = true;
    //   this.emailLoader = false;
    // }, 3000);
    // return;
    if (this.user.email) {
      this.app_ser.post("site_feed/account/auth_by_email", { email: this.user.email }).subscribe(
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

  hasError($event) {
    console.log("hasError event", $event)
    this.hasErrorPhone = !$event;


  }
  onCountryChange($event) {
    console.log(" onCountryChange event", $event)

  }
  getNumber($event) {
    this.user.phone = $event;
    console.log("getNumber event", $event)

  }
  telInputObject($event) {
    console.log(" telInputObject event", $event)

  }


}
