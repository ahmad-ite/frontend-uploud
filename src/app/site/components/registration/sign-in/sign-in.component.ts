import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { AppService } from '../../../../services/app.service';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../../_models/loadData';




import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { Socialusers } from '../../../../_models/socialusers'
import { SocialloginService } from '../../../../services/sociallogin.service';
import { TranslateService } from '@ngx-translate/core';
import { SignupTypeComponent } from '../signup-type/signup-type.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  templateChecked = false;
  submitted = false;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  response: any;
  langStyle: any;

  @Input() name: any;

  socialusers = new Socialusers();

  logout() {

    this.OAuth.signOut().then(data => {
      debugger;
      this.router.navigate([`/Login`]);
    });
  }
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
    // public dialogRef: MatDialogRef<SignInComponent>,

    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.langStyle = "wrapper-lang-signin-" + this.app_ser.app_lang();

  }

  // abs(){
  //   this.activeModal.close(false);
  // }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialusers = JSON.parse(localStorage.getItem('socialusers'));

  }


  // for accessing to form fields
  get fval() { return this.loginForm.controls; }
  checked() {
    if (!this.loginForm.invalid)
      return true;
    return false;
  }
  terms() {
    this.templateChecked = !this.templateChecked;
  }

  onFormSubmit() {
    this.submitted = true;
    if (!this.checked()) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.fval.email.value, this.fval.password.value)
      .subscribe(
        data => {
          // if (data.is_trainer)
          //   // this.router.navigate(['']);
          // else
          //   this.router.navigate(['']);
          // this.dialogRef.close();
          // this.modalService.dismissAll();

          if (data && data.emailAuth) {
            return this.activeModal.close(false);
          }
          this.toastr.success(this.translate.instant('Login successfully'), this.translate.instant('Welcome') + " " + data.name);
          if (!data.is_trainer)
            this.activeModal.close("user");
          else if (data && data.is_trainer) {

            // this.router.navigate(['maani']);
            this.router.navigate([{ outlets: { primary: '', sidebar: 'trainer' } }]);
            this.activeModal.close("trainer");

          }
          else {
            // this.router.navigate(['abdul']);
            // this.activeModal.close("trainer");

          }


        },
        error => {
          // this.toastr.error(error.error.message, 'Error');
          this.loading = false;
        });
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {

      this.Savesresponse(socialusers);

    });
  }
  Savesresponse(socialusers: Socialusers) {

    this.SocialloginService.Savesresponse(socialusers)
      .subscribe((user: any) => {

        if (user && user.data.token) {
          // this.dialogRef.close();
          // store user details in local storage to keep user logged in
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
          this.activeModal.close("user");
          // this.modalService.dismissAll();
        }
        return user.data;

      }
      )
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
  closeSignInModal() {
    this.getDismissReason('Test');
    // this.modalService.dismissAll();
  }

  reset() {

    this.activeModal.close("false");
    this.app_ser.openResetPass().then(res => {
      if (res) {
        this.app_ser.openSetPass(res.user).then(result => {
          if (result) {
            this.toastr.success(this.translate.instant('reset successfully'), this.translate.instant('thank you'));

          }


        });

      }

    });
  }
  showSignUpType() {
    this.openSignupType();
  }
  openSignupType() {
    this.modalService.open(SignupTypeComponent, { windowClass: 'signUpTypeModal', centered: true, backdrop: false });
  }
}

