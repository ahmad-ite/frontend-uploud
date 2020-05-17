import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { AuthenticationService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-email-authentication',
  templateUrl: './email-authentication.component.html',
  styleUrls: ['./email-authentication.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmailAuthenticationComponent implements OnInit {
  @Input() email: any;
  emailCode: String = "";
  langStyle: string;
  loader: boolean;

  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.emailCode = "";
    this.loader = false;

    this.langStyle = "wrapper-lang-setPassword-" + this.app_ser.app_lang();

  }

  ngOnInit() {
  }

  checked({ value, valid }) {
    if (!valid)
      return false;
    return true;
  }
  send({ value, valid }) {

    // return;

    if (!this.checked({ value, valid })) {

      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));

      return
    }
    this.loader = true;
    this.app_ser.post("site_feed/account/auth_sign_up", { data: { email: this.email, code: this.emailCode } }).subscribe(
      data => {
        // this.dialogRef.close()
        this.modalService.dismissAll();
        if (data && data.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('currentUser', JSON.stringify(data));

        }

        // this.router.navigate(["/"]);
        // this.router.navigate(['trainer-profile-setup']);
        // this.router.navigate(['update-profile']);
        if (data.is_trainer) {
          this.router.navigate(['/trainer'])

          // this.router.navigate(['/update-profile/' + data.id + "/" + this.app_ser.urlString(data.name)])

        }
        else {
          this.router.navigate(['/'])
        }
        // this.translate.instant('Register Succeded')
        this.toastr.success(this.translate.instant('register successfully'), this.translate.instant('Welcome') + " " + data.name);
        // this.toastr.success('Register Succeded', 'Welcome ' + data.name);
        this.loader = false;
      },
      error => {
        this.loader = false;
      }

    );



  }
  resendEmail() {
    this.loader = true;
    this.app_ser.post("site_feed/account/resend_email_code", { data: { email: this.email } }).subscribe(
      data => {
        this.loader = false;
        this.toastr.success(this.translate.instant('The verification code has been sent to your email successfully'), this.translate.instant('Welcome') + " " + data.name);


      });

  }


}
