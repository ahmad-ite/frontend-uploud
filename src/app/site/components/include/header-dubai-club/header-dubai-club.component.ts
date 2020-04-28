import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DialogService } from '../../../../services/dialog.service';
import { SignInComponent } from '../../registration/sign-in/sign-in.component';
import { SignUpComponent } from '../../registration/sign-up/sign-up.component';


import { AppService } from '../../../../services/app.service';

import { AuthenticationService } from '../../../../_services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { SignupTypeComponent } from '../../registration/signup-type/signup-type.component';
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule, ModalDirective } from 'ng-uikit-pro-standard'

@Component({
  selector: 'app-header-dubai-club',
  templateUrl: './header-dubai-club.component.html',
  styleUrls: ['./header-dubai-club.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderDubaiClubComponent implements OnInit {

  @ViewChild(MatMenuTrigger, null) trigger: MatMenuTrigger;
  // @ViewChild(ModalDirective) frame: ModalModule;
  closeResult: string;
  test: String;
  langStyle: any;
  searchInput: boolean = false;
  public search: string;

  private sub: any;
  constructor(
    public translate: TranslateService,
    public dialogService: DialogService,
    public authenticationService: AuthenticationService,
    public app_ser: AppService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: NgbModal

  ) {
    this.search = "";

    this.langStyle = "wrapper-header-dubai-club-" + this.app_ser.app_lang();

  }

  ngOnInit() {

  }
  showLogin() {
    this.app_ser.openSignIn();

  }
  showSignUpType() {
    this.openSignupType();
  }
  showSignup() {
    this.app_ser.openSignUp();


  }




  appLang() {
    return this.translate.getDefaultLang();
  }
  changedLang() {
    let lang = this.translate.getDefaultLang();
    if (lang == "ar")
      this.translate.setDefaultLang('en');

    else
      this.translate.setDefaultLang('ar');
    // this.router.navigateByUrl(this.router.url);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate([this.router.url]);


  }
  usrImg() {
    let user = this.app_ser.getCurrentUser();
    if (user.image) {
      return this.app_ser.img_url(user.image, 'user')
    }
    if (user.image_url) {
      return user.image_url;
    }
    return this.app_ser.img_url(user.image, 'user')

  }
  viewProfile() {
    let user = this.app_ser.getCurrentUser();
    // if (user.is_trainer) {
    //   this.router.navigate(['/profile/' + user.id + "/" + this.app_ser.urlString(user.name)])
    //   return;
    // }
    if (user.is_trainer) {
      this.router.navigate(['/'])
      return;
    }
    if (!user.is_trainer) {
      this.router.navigate(['/my-profile/' + user.id + "/" + this.app_ser.urlString(user.name)])
      return;
    }
  }

  logout() {

    this.authenticationService.logout();
    this.router.navigate(['/'])

    // this.router.navigate(['/login'], { queryParams: { returnUrl: "this.state.url" }});
  }

  searchCourses(s) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    if (this.search) {
      this.router.navigate(['search/' + this.search])
    }

    // this.search = ""
  }
  myLibrary() {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    this.router.navigate(['/my-library/my-courses'])
  }
  expandSearch() {
    this.searchInput = !this.searchInput;
  }
  // openMyMenuGallery(b) {
  //   this.trigger.toggleMenu();
  // }
  // openMyMenuCategories(a){
  //   this.trigger.toggleMenu();
  // }
  // closeMyMenuGallery() {
  //   this.trigger.closeMenu();
  // }
  // closeMyMenuCategories() {
  //   this.trigger.closeMenu();
  // }
  // openSignIn() {
  //   const modalRef = this.modalService.open(SignInComponent,{windowClass:'signInModal', size:'lg',centered:true, backdrop:false});
  //   modalRef.componentInstance.name = 'Test Content SignIn';
  // }

  openSignUp() {
    const modalRef = this.modalService.open(SignUpComponent, { windowClass: 'signUpModal', size: 'lg', centered: true, backdrop: false });
    modalRef.componentInstance.signup = 'Test Content SingUp';
  }
  openSignupType() {
    this.modalService.open(SignupTypeComponent, { windowClass: 'signUpTypeModal', centered: true, backdrop: false });
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
