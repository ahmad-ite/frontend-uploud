
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../services/dialog.service';
import { AppService } from '../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { Socialusers } from '../../../_models/socialusers'
import { SocialloginService } from '../../../services/sociallogin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../../../site/components/registration/sign-up/sign-up.component';
import { TrainerSignupComponent } from '../../../site/components/registration/trainer-signup/trainer-signup.component';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewPdfComponent implements OnInit {
  langStyle: any;
  @Input() path: string;

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
    this.langStyle = "wrapper-lang-pdf-view-" + this.app_ser.app_lang();
  }
  showSignup() {
    this.openSignUp();
  }
  showTrainerSignup() {
    this.openTrainerSignUp();
  }
  ngOnInit() {
  }
  openSignUp() {
    this.modalService.open(SignUpComponent, { windowClass: 'signUpModal', size: 'lg', centered: true, backdrop: false });
  }
  openTrainerSignUp() {
    this.modalService.open(TrainerSignupComponent, { windowClass: 'trainerSignUpModal', size: 'lg', centered: true, backdrop: false });
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

}
