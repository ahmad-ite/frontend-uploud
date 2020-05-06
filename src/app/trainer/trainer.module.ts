import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
// import { TrainerCoursesComponent } from '../components/trainer/courses/trainer-courses/trainer-courses.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { TrainerNavigationComponent } from './components/include/trainer-navigation/trainer-navigation.component';
import { TrainerHeaderComponent } from './components/include/trainer-header/trainer-header.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { TrainerFooterComponent } from './components/include/trainer-footer/trainer-footer.component';
import { TrainerCoursesComponent } from './components/courses/trainer-courses/trainer-courses.component';
import { SharedModule } from '../shared/SharedModule';
import { AddCourseComponent } from './components/courses/add-course/add-course.component';
import { AddItemsComponent } from './components/courses/add-items/add-items.component';
import { CourseSummaryComponent } from './components/courses/course-summary/course-summary.component';
import { MediaUploadComponent } from './components/modals/media-upload/media-upload.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUploaderModule } from 'ngx-uploader';
import { VgCoreModule } from 'videogular2/compiled/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GalleryComponent } from './components/media/gallery/gallery.component';
import { StepsManagementComponent } from './components/courses/steps-management/steps-management.component';
import { UploadComponent } from './components/media/upload/upload.component';
import { CorrectionIndexComponent } from './components/corrections/correction-index/correction-index.component';
import { CourseCorrectionsStudentsComponent } from './components/corrections/course-corrections-students/course-corrections-students.component';
import { StudentCorrectionsComponent } from './components/corrections/student-corrections/student-corrections.component';
import { CorrectionPopupComponent } from './components/corrections/correction-popup/correction-popup.component';
import { AddCourseMainComponent } from './components/courses/add-course-main/add-course-main.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { ReportComponent } from './components/reports/report/report.component';
import { QuarterReportComponent } from './components/reports/quarter-report/quarter-report.component';
// import { CourseLoaderComponent } from '../components/utils/course-loader/course-loader.component';


@NgModule({
  declarations: [
    TrainerComponent,



    // CourseLoaderComponent,



    //includes
    TrainerNavigationComponent,
    TrainerHeaderComponent,
    TrainerFooterComponent,


    //courses
    TrainerCoursesComponent,
    AddCourseComponent,
    AddItemsComponent,
    CourseSummaryComponent,
    StepsManagementComponent,

    //media
    UploadComponent,
    MediaUploadComponent,
    GalleryComponent,
    GalleryComponent,
    StepsManagementComponent,
    CorrectionIndexComponent,
    CourseCorrectionsStudentsComponent,
    StudentCorrectionsComponent,
    CorrectionPopupComponent,
    AddCourseMainComponent,
    DashboardComponent,
    ReportComponent,
    QuarterReportComponent


  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        // useClass: CustomTranslateLoader,
        deps: [HttpClient]
      },


      isolate: false
    }),

    NgxUiLoaderModule,
    NgxUploaderModule,
    VgCoreModule,
    NgbModule,
    VgControlsModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFileDropModule,
    DragDropModule,
  ]
  ,
  entryComponents: [
    CorrectionPopupComponent

  ],
  providers: [

    MDBSpinningPreloader,

  ]
})
export class TrainerModule { }
