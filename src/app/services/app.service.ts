import { Injectable, ɵConsole } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models";
import { TranslateService } from "@ngx-translate/core";
import { map } from "rxjs/operators";
import { isObject } from "util";
import { Globals } from '../globals'
import { ToastrService } from 'ngx-toastr';
import { KeyValue } from '@angular/common';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../site/components/registration/sign-in/sign-in.component';
import { SignUpComponent } from '../site/components/registration/sign-up/sign-up.component';
import { TermsAndConditionsComponent } from '../site/components/modals/terms-and-conditions/terms-and-conditions.component';
import { ViewPdfComponent } from '../shared/modals/view-pdf/view-pdf.component';
import { InputsCertificatComponent } from '../site/components/modals/inputs-certificat/inputs-certificat.component';
import { ResetFormComponent } from '../site/components/modals/reset-form/reset-form.component';
import { SetPasswordFormComponent } from '../site/components/modals/set-password-form/set-password-form.component';
import { MediaUploadComponent } from '../trainer/components/modals/media-upload/media-upload.component';
import { VideoDetailPopupComponent } from '../trainer/components/modals/video-detail-popup/video-detail-popup.component';
import { GalleryPopupComponent } from '../trainer/components/modals/gallery-popup/gallery-popup.component';
import { EmailAuthenticationComponent } from '../site/components/modals/email-authentication/email-authentication.component';
import { PaymentGatewayComponent } from '../site/components/modals/payment-gateway/payment-gateway.component';
import { UpdateProfileComponent } from '../site/components/student/update-profile/update-profile.component';
import { InvoiceComponent } from '../site/components/student/invoice/invoice.component';
import { AuthenticationService } from '../_services';
import { GalleryItemPreviewComponent } from '../trainer/components/modals/gallery-item-preview/gallery-item-preview.component';
import { UploadGalleryPopupComponent } from '../trainer/components/modals/upload-gallery-popup/upload-gallery-popup.component';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: "root"
})
export class AppService {
  private assetsPath: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public header: HttpHeaders;
  public FOLDER: any;
  closeResult: string;
  rating_arr: any[];
  public paymentModal: NgbActiveModal;
  static paymentMethodModal: any;
  static arrModals: any[] = [];
  media_endpoint: string;

  constructor(
    public globals: Globals,
    public toastr: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private authenticationService: AuthenticationService,
    private translate: TranslateService, private http: HttpClient) {
    this.assetsPath = '../../kun/ang8/assets/images/';
    this.assetsPath = '../../assets/images/';
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    // this.media_endpoint = "https://kun-academy.s3.amazonaws.com/media_files/";
    this.media_endpoint = "https://d37mzwcv0vfzkr.cloudfront.net/media_files/"
    this.FOLDER = "media_files/"
    this.currentUser = this.currentUserSubject.asObservable();
    this.header = new HttpHeaders();
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    this.header.append('content-type', 'application/json');
    this.header.append("Accept", 'application/json');



  }
  //SORTING START  KEY&&VALUE


  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  // Order by ascending property value
  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }

  // Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  //SORTING END
  isObject(value) {
    return value && typeof value === "object" && value.constructor === Object;
  }



  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: 'AKIAI33YYHOMH5FJ4RPQ',
        secretAccessKey: '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',
        region: 'Singapore'
      }
    );
    const params = {
      Bucket: 'kun-academy',
      // Key: this.FOLDER + file.name,
      Key: this.FOLDER + "ahmadtest.mp4",
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };


    // bucket.upload(params, function (err, data) {
    //   if (err) {
    //
    //     return false;
    //   }

    //   return true;
    // });
    //for upload progress
    return bucket;
    bucket.upload(params).on('httpUploadProgress', function (evt) {

    }).send(function (err, data) {
      if (err) {

        return false;
      }

      return true;
    });
  }
  dollarToAED(value) {
    return (value * 3.67).toFixed(0);
  }
  init_params(params) {
    var postData: any = new FormData();

    if (params) {
      const keys = Object.entries(params);
      for (const [key, value] of keys) {
        if (key == "data") {
          postData = this.init_param_data(postData, value);
        } else {
          postData.append(key, value);
        }
      }
    }

    let user: any;
    // user = localStorage.getItem("currentUser");
    user = this.getCurrentUser();
    if (user && user.token) {

      postData.append("token", user.token);
    }

    return postData;
  }
  init_param_data(postData, data) {
    const keys = Object.entries(data);
    for (const [key, value] of keys) {
      postData.append("data[" + key + "]", value);
    }
    return postData;
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
  isStudent() {
    let user = this.getCurrentUser();
    if (user && user.is_trainer == 0) {
      return true;
    }
    return false;
  }
  urlString(ar_str: string, en_str = "") {
    if (en_str)
      return this.stringLang(ar_str, en_str).replace(/\s+/g, '-');//.toLowerCase();
    return ar_str.replace(/\s+/g, '-');//.toLowerCase();
  }

  newLineString(str: string) {
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str.replace('↵', '&&&&&&');//.toLowerCase();
    // return ar_str.replace(/\s+/g, '-');//.toLowerCase();
  }
  stringLang(ar_str, en_str) {
    if (this.app_lang() == "ar")
      return ar_str;
    return en_str
  }


  isTrainer(mode = 0) {
    if (mode) {
      return false;
    }
    let user = this.getCurrentUser();
    if (user && user.is_trainer == 1) {
      return true;
    }
    return false;
  }
  isStudentLogined1() {
    if (!this.isStudent()) {
      this.toastr.error(this.translate.instant('studentLoginMsg'), this.translate.instant('error'));
      return false;
    }

    return true;
  }
  isStudentLogined2() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('foo');
      }, 300);
    });
    // return new Promise(function (resolve, reject) {
    //   setTimeout(() => resolve("done!"), 1000);
    // });
  }

  isStudentLogined() {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (self.isStudent()) {
        resolve(true)
      }
      else {
        self.openSignIn().then((res) => {
          if (res == "user")
            resolve(true)
          else
            resolve(false)
        });
      }
    });
  }
  usrImg() {
    let user = this.getCurrentUser();
    if (user.image) {
      return this.img_url(user.image, 'user')
    }
    if (user.image_url) {
      return user.image_url;
    }
    return this.img_url(user.image, 'user')

  }
  isTrainerLogined() {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (self.isTrainer()) {
        resolve(true)
      }
      else {
        self.openSignIn().then((res) => {
          if (res == "trainer")
            resolve(true)
          else
            resolve(false)
        });
      }
    });
  }


  async openSignIn() {

    return await this.modalService.open(SignInComponent, { windowClass: 'signInModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;

      this.viewTrainerPanel();
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  viewTrainerPanel() {
    let user = this.getCurrentUser();

    if (user.is_trainer) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.navigate(['/trainer'])
      return;
    }

  }

  async openSignUp() {

    return await this.modalService.open(SignUpComponent, { windowClass: 'signUpModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  async openResetPass() {

    return await this.modalService.open(ResetFormComponent, { windowClass: 'resetModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });
  }

  async openPaymentGateway(courseDetail = null, payment = null) {

    AppService.paymentMethodModal = this.modalService.open(PaymentGatewayComponent, { windowClass: 'paymentGateway', size: 'lg', centered: true, backdrop: false });
    AppService.arrModals.push(AppService.paymentMethodModal);
    this.globals.paymentModal = AppService.paymentMethodModal;
    if (courseDetail) {
      AppService.paymentMethodModal.componentInstance.inputCourseDetail = courseDetail;
      this.globals.test = "Ahmad"
      console.log("payment paymentMethodModal", AppService.paymentMethodModal);
      console.log("payment paymentMethodModal", this.globals);
      return await AppService.paymentMethodModal.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result == 'false')
          return false;
        return result;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        return false;
      });
    }

  }
  closeAllPaymentGateway(data) {
    console.log("payment arrr", AppService.arrModals);
    AppService.arrModals.forEach(element => {
      console.log(element)
      element.close(data)
    }
    );


  }
  closePaymentGateway(data) {


    AppService.paymentMethodModal.close(data);
  }

  async openUpdateProfile() {

    return await this.modalService.open(UpdateProfileComponent, { windowClass: 'updateProfile', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });
  }

  async openSetPass(user) {

    var passModal = this.modalService.open(SetPasswordFormComponent, { windowClass: 'resetModal', size: 'lg', centered: true, backdrop: false });
    passModal.componentInstance.user = user;
    return await passModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });
  }

  showFile(path) {
    var ext = path.split('.').pop();
    if (ext == 'pdf' || ext == 'PDF')
      return this.showPdf(path);

    // if (ext == 'doc' || ext == 'docs' || ext == 'docx')
    //   return this.showPdf(path);

    this.toastr.error(this.translate.instant('fileNotSupported'), this.translate.instant('error'));


  }
  showPdf(path) {
    var pdfModal = this.modalService.open(ViewPdfComponent, { windowClass: 'view-pdf', size: 'lg', centered: true });
    pdfModal.componentInstance.path = path;
  }
  async showInvoice() {

    return await this.modalService.open(InvoiceComponent, { windowClass: 'invoiceModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });
  }

  async uploadTrainerMedia(course = 0, type = 'video', ) {
    var trainerMedia = this.modalService.open(MediaUploadComponent, { windowClass: 'media-upload-main', size: 'lg', centered: true, backdrop: false });

    trainerMedia.componentInstance.inputCourse = course;
    trainerMedia.componentInstance.type = type;
    return await trainerMedia.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }

  showDubbingVideo(uuid, name) {
    var input = { uuid: uuid, file_name: name };
    this.openVideoDetailPopup(input);

  }
  async openVideoDetailPopup(video, details = false) {
    var videoModal = this.modalService.open(VideoDetailPopupComponent, { windowClass: 'videoDetailPopup', size: 'lg', centered: true, backdrop: false });
    videoModal.componentInstance.video = video;
    videoModal.componentInstance.details = details;
    return await videoModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  async openImagePreview(image) {
    var imageModal = this.modalService.open(GalleryItemPreviewComponent, { windowClass: 'imagePreviewPopup', size: 'lg', centered: true, backdrop: false });
    imageModal.componentInstance.imageObj = image;
    return await imageModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  async openGalleryPopup(course = 0, type = 'video', mode = "view", lang = "ar") {

    var galleryModal = this.modalService.open(GalleryPopupComponent, { windowClass: 'galleryPopupModal', size: 'lg', centered: true, backdrop: false });
    // videoModal.componentInstance.video = video;
    // videoModal.componentInstance.details = details;

    galleryModal.componentInstance.currentCourse = course;
    galleryModal.componentInstance.activeTab = type;
    galleryModal.componentInstance.mode = mode;
    galleryModal.componentInstance.lang = lang;

    return await galleryModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }

  async openUploadGalleryPopup(course = 0, type = 'video', lang = "ar") {

    var uploadGalleryModal = this.modalService.open(UploadGalleryPopupComponent, { windowClass: 'galleryPopupModal', size: 'lg', centered: true, backdrop: false });
    // videoModal.componentInstance.video = video;
    // videoModal.componentInstance.details = details;

    uploadGalleryModal.componentInstance.currentCourse = course;
    uploadGalleryModal.componentInstance.activeTab = type;
    uploadGalleryModal.componentInstance.lang = lang;

    return await uploadGalleryModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  // async openGalleryPopup(video,details=false){
  //   var videoModal = this.modalService.open( GalleryPopupComponent, { windowClass: 'wrapGalleryPopup', size: 'lg', centered: true , backdrop: false});
  //   videoModal.componentInstance.video = video;
  //   videoModal.componentInstance.details = details;
  //   return await videoModal.result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     if (result == 'false')
  //       return false;
  //     return result;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     return false;
  //   });


  // }
  async openInpuCertificate() {

    return await this.modalService.open(InputsCertificatComponent, { windowClass: 'inputCertificateModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }

  async openEmailAuthentication(email = "") {
    var EmailAuthenticationModal = this.modalService.open(EmailAuthenticationComponent, { windowClass: 'resetModal', size: 'lg', centered: true, backdrop: false });
    EmailAuthenticationModal.componentInstance.email = email;

    return await EmailAuthenticationModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;
      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }




  async openTerms() {

    return await this.modalService.open(TermsAndConditionsComponent, { windowClass: 'termsModal', size: 'lg', centered: true, backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

  }
  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 12,
    maxPages: number = 6
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    let show = false;
    if (pages.length > 1)
      show = true
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
      show: show,

    };
  }

  public getIPAddress() {

    return this.http.get("https://api6.ipify.org?format=json");

  }
  public getIPAddress2() {
    return this.http.get<any>("http://api.ipify.org/?format=json").pipe(
      map(function (response) {
        alert(response)
        return response;
      }));
  }
  post(url: string, params: object, showError = true) {
    var postData = this.init_params(params);
    let user: any;
    user = this.getCurrentUser();
    if (user && user.token) {
      url += "?token=" + user.token;
    }

    return this.http.post<any>(url, postData, { headers: this.header }).pipe(
      map(function (response) {


        if (!response.error) {
          return response.data;
        }
        else {
          if (response.msg == 'INVALID_TOKEN' || response.msg == 'UN_SUPPORTED_TOKEN') {
            this.authenticationService.logout();
            this.toastr.error(this.translate.instant(response.msg), this.translate.instant('error'));
            this.openSignIn();

          }
          else {
            if (showError)
              this.toastr.error(this.translate.instant(response.msg), this.translate.instant('error'));
          }



          throw response.msg



        }
      }, this)
    );
  }

  post_without_token(url: string, params: object, showError = true) {
    var postData = this.init_params(params);
    let user: any;
    user = this.getCurrentUser();
    // if (user && user.token) {
    //   url += "?token=" + user.token;
    // }

    return this.http.post<any>(url, postData, { headers: this.header }).pipe(
      map(function (response) {


        if (!response.error) {
          return response.data;
        }
        else {
          if (response.msg == 'INVALID_TOKEN' || response.msg == 'UN_SUPPORTED_TOKEN') {
            this.authenticationService.logout();
            this.toastr.error(this.translate.instant(response.msg), this.translate.instant('error'));
            this.openSignIn();

          }
          else {
            if (showError)
              this.toastr.error(this.translate.instant(response.msg), this.translate.instant('error'));
          }



          throw response.msg



        }
      }, this)
    );
  }
  logout() {
    return this.authenticationService.logout();
  }

  video_url(video, derivations = null, quality = "default") {

    var qualities = { "q_1080": 1080, "q_720": 720, "q_480": 480, "q_360": 360, "q_240": 240 };

    if (derivations && quality != "dafault") {
      if (derivations.hasOwnProperty(quality)) {


        return this.media_endpoint + derivations[quality];
      }
      else {

        var keys = Object.keys(qualities)
        for (var i = 0; i < keys.length; i++) {
          if (derivations.hasOwnProperty(keys[i]) && keys[i] <= quality) {

            return this.media_endpoint + derivations[keys[i]];
          }
        }
        //  Object.keys(qualities).forEach(function (key) {

        //   if ( derivations.hasOwnProperty(key) && key <= quality){

        //     return this.media_endpoint + derivations[key];

        //   }

        // });
      }

      // return this.media_endpoint + derivations.q_240;
    }




    if (video) {
      return this.media_endpoint + video;
    }
    return this.media_endpoint + "1576314660565-0577b0d3e-51e7-4e29-90f7-95eb14f5b21e.mp4";
  }

  gif_url(video, derivations) {
    if (derivations) {
      if (derivations.gif) {
        if (derivations.gif.includes('.mp4')) {
          return this.assetsPath + 'gif-default.jpg';
        }
        return this.media_endpoint + derivations.gif;
      }

    }

    return this.assetsPath + 'gif-default.jpg';

    // https://kun-academy.s3.amazonaws.com/media_files/E1459ED1-4A26-4739-A44E-2A4969BA34A3.gif
    // gif-default.jpg
    return this.media_endpoint + "E1459ED1-4A26-4739-A44E-2A4969BA34A3.gif";
  }


  audio_url(audio) {
    return this.media_endpoint + audio;
  }
  file_url(f) {
    return this.media_endpoint + f;
  }

  img_url(url, type = "default") {
    if (url) {
      return this.media_endpoint + url;
    }
    if (type == "course") return this.assetsPath + "course-default.jpg";

    if (type == "trainer") return this.assetsPath + "user-default.jpg";

    if (type == "exam") return this.media_endpoint + "no-user-image-square.jpg";

    if (type == "lesson") return this.media_endpoint + "no-user-image-square.jpg";

    if (type == "student") return this.assetsPath + "user-default.jpg";
    if (type == "logo") return this.assetsPath + "Logo.png";
    // if (type == "user") return this.media_endpoint + "no-user-image-square.jpg";
    // ../../../assets/images/Logo.png
    if (type == "user") return this.assetsPath + "user-default.jpg";
    if (type == "signature") return this.assetsPath + "signature.jpg";
    if (type == "audio") return this.assetsPath + "audio-default.png";
    if (type == "video") return this.assetsPath + "video-thumbnail.jpg";


    return this.media_endpoint + "no-user-image-square.jpg";
  }
  doc_url(url) {
    return this.media_endpoint + url;

  }
  secToTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(Math.floor(time % 3600) / 60);
    var seconds = Math.floor(Math.floor(time % 3600) % 60);
    return hours + "h " + minutes + "m " + seconds + "s";
  }
  copyObj(mainObj) {
    return JSON.parse(JSON.stringify(mainObj));
  }

  app_lang() {
    return this.translate.getDefaultLang();
  }

  nationalities() {
    if (this.app_lang() == "ar") {
      return this.globals.ar_nationalities;
    }
    return this.globals.en_nationalities;
  }

  genderValue = [
    { name: 'أنثى', enName: 'Female' },
    { name: 'ذكر', enName: 'Male' }

  ];
  getGenderValue(index) {
    index = parseInt(index);
    if (this.app_lang() == "ar") {
      return this.genderValue[index].name
    }
    return this.genderValue[index].enName

  }
  //for instructions
  inst(key) {
    if (this.app_lang() == "ar") {
      return this.globals.ar_instructions[key] || key;
    }
    return this.globals.en_instructions[key] || key;;
  }


  dubbingList = [
    { code: 'ar', name: "Arabic", link: "" },
    { code: 'en', name: "English", link: "" },
    { code: 'fr', name: "France", link: "" },
    { code: 'or', name: "Ordo", link: "" },
    { code: 'tu', name: "Turkish", link: "" }
  ];
  langList = [
    { code: 'ar', name: "Arabic", link: "" },
    { code: 'en', name: "English", link: "" },
    { code: 'fr', name: "France", link: "" },
    { code: 'or', name: "Ordo", link: "" },
    { code: 'tu', name: "Turkish", link: "" }
  ];



  appLangs() {
    return [
      { code: 'ar', name: "العربية" },
      { code: 'en', name: "English" },

    ];
  }

  getDubbingList(video_derivation) {

    if (!video_derivation)
      return [];
    if (!video_derivation.dubbings)
      return [];
    var dubbingList1 = [];
    for (var i = 0; i < this.dubbingList.length; i++) {

      if (video_derivation.dubbings.hasOwnProperty(this.dubbingList[i].code)) {
        if (video_derivation.dubbings[this.dubbingList[i].code] && video_derivation.dubbings[this.dubbingList[i].code].file) {
          this.dubbingList[i].link = video_derivation.dubbings[this.dubbingList[i].code].file;
          dubbingList1.push(this.dubbingList[i])


        }

      }
    }
    return dubbingList1;
  }

  qualityList = [
    { code: 'q_1080', name: "1080 HD", link: "" },
    { code: 'q_720', name: "720 HD", link: "" },
    { code: 'q_480', name: "480", link: "" },
    { code: 'q_360', name: "360", link: "" },
    { code: 'q_240', name: "240", link: "" },




  ];
  getQualityList(video_derivation) {

    if (!video_derivation)
      return [];

    var qList1 = [];
    for (var i = 0; i < this.qualityList.length; i++) {

      if (video_derivation.hasOwnProperty(this.qualityList[i].code)) {
        if (video_derivation[this.qualityList[i].code]) {
          this.qualityList[i].link = video_derivation[this.qualityList[i].code];
          qList1.push(this.qualityList[i])


        }

      }
    }
    return qList1;
  }
  getDubbingLangIndex(dubbingList = [], lang = 'ar') {

    for (var i = 0; i < dubbingList.length; i++) {
      if (dubbingList[i].code == lang)
        return i;
    }
    return -1
  }
  getAppQuality(qualitiesList) {

    for (var i = 0; i < qualitiesList.length; i++) {
      if (qualitiesList[i].code == this.globals.quality)
        return i;
    }
    return Math.floor(qualitiesList.length / 2)
  }
  updateQuality(q) {
    this.globals.quality = q;
  }
  updateFullscreen(value) {
    this.globals.full_screen = value;
  }
  getFullscreenValue() {
    return this.globals.full_screen;
  }

  getActiveDubbing(list, lang) {
    var activeDubbing = -1
    for (var i = 0; i < list.length; i++) {
      if (list[i].code == lang) {
        activeDubbing = i;
        break
      }


    }
    return activeDubbing;
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
  appropriateExtension(mode = 'video') {
    switch (mode) {
      case "image":
        return ['jpg', 'png', 'gif', 'jpeg'];
        break;
      case "file":
        return ['pdf', 'doc', 'docs', 'docx'];
        break;
      case "video":
        return ['mp4', '3gp', 'ogg', 'wmv ', 'webm ', 'flv', 'AVI', 'avi'];
        break;
      case "dubbing":
        return ['mp4', '3gp', 'ogg', 'wmv ', 'webm ', 'flv', 'AVI', 'avi'];
        break;
      case "audio":
        return ['mp3', 'wav'];
        break;
      case "subtitle":
        return ['srt', 'vtt'];
        break;

    }
  }
  initStarRating(rating: any) {
    var rating_arr = [];

    for (let index = 0; index < 5; index++) {

      if (rating > index + 0.5) {
        rating_arr.push("fas fa-star star-full");
        continue;

      }
      if (rating > index && rating <= index + 0.5) {
        rating_arr.push("fas fa-star-half-alt star-half");
        continue;

      }
      rating_arr.push("far fa-star star-empty");


    }
    return rating_arr;
  }
  formatTime(duration) {

    var time = {
      hours: 0,
      minutes: 0

    }
    if (duration) {
      var temp = duration.split(':');
      time.hours = (parseInt(temp[0])) ? temp[0] : 0;
      time.minutes = (parseInt(temp[1])) ? temp[1] : 0;
    }

    return time;
  }
}

