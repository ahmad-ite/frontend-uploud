
import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
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
import { StepChangeEvent } from 'ng-uikit-pro-standard/lib/pro/stepper/stepper.component';
import { StepsManagementComponent } from '../steps-management/steps-management.component';
import { CourseSummaryComponent } from '../course-summary/course-summary.component';



@Component({
  selector: 'app-add-course-main',
  templateUrl: './add-course-main.component.html',
  styleUrls: ['./add-course-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCourseMainComponent implements OnInit, AfterViewInit {

  langStyle: any;

  user: Trainer;
  signUpForm: FormGroup;
  templateChecked: any;
  trainer: Trainer;
  inputTrainer: InputTrainer;
  id: any;
  itemId: number = 0;
  courseId: number = 0;
  openSteps: boolean = true;
  /*   mode: string = 'add';
    courseId: number;
    itemId: number; */
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


    this.courseId = parseInt(this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 0);


  }
  ngAfterViewInit(): void {

  }

  @ViewChild(CourseSummaryComponent, { static: false })
  private ItemsComponent: CourseSummaryComponent;

  @ViewChild(StepsManagementComponent, { static: false })
  private StepsComponent: StepsManagementComponent;

  ngOnInit() {

    // this.addRecaptchaScript();
    // this.trainer.is_trainer = 0;
    this.templateChecked = 0;



  }





  onPlayerReady(api: VgAPI) {

  }
  approve() {



    this.app_ser.post("site_feed/TrainerCourse/ask_approve/" + this.courseId, {}).subscribe(
      data => {

        this.toastr.success(this.translate.instant('Approval is succeeded'), this.translate.instant('Cool!'));

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




  public fileOver(event) {

  }

  public fileLeave(event) {

  }

  onStepChange(event: StepChangeEvent) {
    console.log("event", event);
    console.log("itemId", this.itemId);
    this.openSteps = false;

    if (event.activeStepIndex == 1 && this.courseId) {
      this.ItemsComponent.initData();
    } else if (event.activeStepIndex == 2 && this.itemId) {
      this.StepsComponent.reloadSteps(this.itemId);
    }
  }

  // onItemSelected(itemId) {
  //   alert(itemId);

  //   this.itemId = itemId;
  // }
  // showPdf(path) {
  //   var pdfModal = this.modalService.open(ViewPdfComponent, { windowClass: 'view-pdf', size: 'lg', centered: true });
  //   pdfModal.componentInstance.path = path;
  // }

}

