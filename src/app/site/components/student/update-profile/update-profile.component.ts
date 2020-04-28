
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
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {
  @Input() signup: any;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  user: Student;
  signUpForm: FormGroup;
  langStyle: any;
  templateChecked: any;
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
    this.templateChecked = false;
    this.emailChecked = false;
    this.langStyle = "wrapper-update-profile-" + this.app_ser.app_lang();
  }

  ngOnInit() {

    this.user = new Student();
    this.user.nationality = null
    this.user.is_trainer = 0;
    this.templateChecked = 0;

  }
  terms() {
    this.templateChecked = !this.templateChecked;
  }

  setTemplateChecked(templateChecked) {
    this.templateChecked = !templateChecked;
  }
  

  



  
  register({ value, valid }) {

    
    this.loader = true;
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

  

  
  updateProfile(){

  }

  
}

