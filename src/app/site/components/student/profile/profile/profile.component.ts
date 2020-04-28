import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../../services/dialog.service';
import { AppService } from '../../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { Socialusers } from '../../../../../_models/socialusers'
import { SocialloginService } from '../../../../../services/sociallogin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/loadData';
import { UpdateProfileComponent } from '../../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  langStyle: any;
  user: User;
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
    this.langStyle = "wrapper-student-profile-" + this.app_ser.app_lang();
    this.user = new User();

    this.initUser();
  }

  ngOnInit() {
  }

  initUser() {
    this.id = this.route.snapshot.params['id'];
    this.app_ser.post("site_feed/Account/view/" + this.id, {}).subscribe(
      data => {

        this.user = data.user;




      },
      error => {


      });
  }
  


}


