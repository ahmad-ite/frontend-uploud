
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
import { User, Trainer, InputTrainer, TrainerDoc, Details } from '../../../../_models/loadData';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { VgAPI } from 'videogular2/compiled/core';



@Component({
  selector: 'app-add-course-main',
  templateUrl: './add-course-main.component.html',
  styleUrls: ['./add-course-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCourseMainComponent implements OnInit {

  langStyle: any;
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
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
    this.langStyle = "wrapper-lang-add-course-main-" + this.app_ser.app_lang();
    this.trainer = new Trainer();
    this.inputTrainer = new InputTrainer();
    this.initTrainer();
  }

  ngOnInit() {

    // this.addRecaptchaScript();
    // this.trainer.is_trainer = 0;
    this.templateChecked = 0;



  }
  // init trainer =


  initTrainer() {

    this.id = this.route.snapshot.params['id'];
    this.app_ser.post("site_feed/Account/view/" + this.id, {}).subscribe(
      data => {

        this.trainer = data.user;
        if (!this.trainer.lang) {
          this.trainer.lang = "ar";
        }
        if (!this.trainer.residence) {
          this.trainer.residence = 971;
        }
        if (!this.trainer.nationality) {
          this.trainer.nationality = 971;
        }

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

  // addRecaptchaScript() {

  //   window['grecaptchaCallback'] = () => {
  //     this.renderReCaptcha();
  //   }

  //   (function (d, s, id, obj) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { obj.renderReCaptcha(); return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'recaptcha-jssdk', this));

  // }
  // renderReCaptcha() {
  //   window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
  //     'sitekey': '6LfkxsoUAAAAAHozOpy65WelxOmpSwCRG7WWL4ua',
  //     'callback': (response) => {
  //       this.trainer.captcha = response;
  //     }
  //   });
  // }
  onPlayerReady(api: VgAPI) {

  }
  approve() {


    this.updateTrainerProfile("basic_info");
    this.updateTrainerProfile("experince");
    this.updateTrainerProfile("bank");
    this.app_ser.post("site_feed/account/ask_approve/" + this.trainer.id, {}).subscribe(
      data => {

        this.router.navigate(['/profile/' + this.trainer.id + "/" + this.app_ser.urlString(this.trainer.name)]);



      });
  }
  public files: NgxFileDropEntry[] = [];


  public droppedImage(files: NgxFileDropEntry[], mode = "image") {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var allowedExtensions = this.app_ser.appropriateExtension('image');


          var ext = file.name.split('.').pop();
          if (allowedExtensions.indexOf(ext) !== -1) {
            this.app_ser
              // .post("site_feed/media/addfile/image", { file: file })
              .post("site_feed/TrainerContent/upload/image", { file: file })
              .subscribe(
                data => {
                  switch (mode) {
                    case "image":
                      this.trainer.image = data.uuid;
                      break;
                    case "signature":
                      this.trainer.trainer_signature.doc = data.uuid;
                      break;
                  }

                  // this.updateTrainerProfile();



                },
                error => {
                }
              );
          }


          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public droppedFile(files: NgxFileDropEntry[], mode = "cv") {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var allowedExtensions = this.app_ser.appropriateExtension('file');


          var ext = file.name.split('.').pop();
          if (allowedExtensions.indexOf(ext) !== -1) {
            this.app_ser
              // .post("site_feed/media/addfile/image", { file: file })
              .post("site_feed/TrainerContent/upload/attachment", { file: file })
              .subscribe(
                data => {
                  switch (mode) {
                    case "cv":
                      this.trainer.cv.doc = data.uuid;
                      break;
                    // case "certificate":
                    //   this.trainer.cv.doc = data.uuid;
                    //   break;
                  }

                  // this.updateTrainerProfile();



                },
                error => {
                }
              );
          }


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  droppedVideo(files: NgxFileDropEntry[], mode = "training_video") {
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var allowedExtensions = this.app_ser.appropriateExtension('video');


          var ext = file.name.split('.').pop();
          if (allowedExtensions.indexOf(ext) !== -1) {
            this.app_ser
              // .post("site_feed/media/addfile/image", { file: file })
              .post("site_feed/TrainerContent/upload/video", { file: file })
              .subscribe(
                data => {
                  switch (mode) {
                    case "demonstration_video":
                      this.trainer.demonstration_video.doc = data.uuid;
                      break;
                    case "training_video":
                      this.trainer.training_video.doc = data.uuid;
                      break;
                  }

                  



                },
                error => {
                }
              );
          }


          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  updateTrainerProfile(mode = "basic_info") {
    this.initInputData(mode);
    this.app_ser.post("site_feed/account/save", { data: this.inputTrainer }).subscribe(
      data => {


      });
  }

  canSave(mode = "basic_info") {
    switch (mode) {
      case "basic_info":
        return this.trainer.name && this.trainer.phone && this.trainer.nationality && this.trainer.lang && this.trainer.gender
        break

      case "experince":
        if (this.trainer.demonstration_video.doc) {
          this.inputTrainer.demonstration_video = this.trainer.demonstration_video.doc
        }
        if (this.trainer.demonstration_video.doc) {
          this.inputTrainer.demonstration_video = this.trainer.training_video.doc
        }
        if (this.trainer.training_video.doc) {
          this.inputTrainer.training_video = this.trainer.training_video.doc
        }
        if (this.trainer.trainer_signature.doc) {
          this.inputTrainer.trainer_signature = this.trainer.trainer_signature.doc
        }

        break
    }
    return false;
  }

  initInputData(mode = "basic_info") {

    this.inputTrainer = new InputTrainer();
    switch (mode) {
      case "basic_info":


        this.inputTrainer.name = this.trainer.name;

        this.inputTrainer.image = this.trainer.image;

        this.inputTrainer.phone = this.trainer.phone;
        this.inputTrainer.address = this.trainer.address;
        this.inputTrainer.nationality = this.trainer.nationality;
        this.inputTrainer.residence = this.trainer.residence;
        this.inputTrainer.lang = this.trainer.lang;
        this.inputTrainer.gender = this.trainer.gender;

        break

      case "experince":
        this.inputTrainer.foundation = this.trainer.foundation;
        this.inputTrainer.position = this.trainer.position;
        this.inputTrainer.description = this.trainer.description;
        this.inputTrainer.experience = this.trainer.experience;

        if (this.trainer.demonstration_video.doc) {
          this.inputTrainer.demonstration_video = this.trainer.demonstration_video.doc
        }
        if (this.trainer.training_video.doc) {
          this.inputTrainer.training_video = this.trainer.training_video.doc
        }
        if (this.trainer.cv.doc) {
          this.inputTrainer.cv = this.trainer.cv.doc
        }
        if (this.trainer.trainer_signature.doc) {
          this.inputTrainer.trainer_signature = this.trainer.trainer_signature.doc
        }
        break

      case "bank":
        this.inputTrainer.account_number = this.trainer.bank_details.account_number;
        this.inputTrainer.bank = this.trainer.bank_details.bank;
        this.inputTrainer.iban = this.trainer.bank_details.iban;
        this.inputTrainer.swift_code = this.trainer.bank_details.swift_code;

        break
    }








  }
  public fileOver(event) {
    
  }

  public fileLeave(event) {
    
  }
  // showPdf(path) {
  //   var pdfModal = this.modalService.open(ViewPdfComponent, { windowClass: 'view-pdf', size: 'lg', centered: true });
  //   pdfModal.componentInstance.path = path;
  // }

}

