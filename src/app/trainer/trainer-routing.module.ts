import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerComponent } from './trainer.component';

import { TrainerCoursesComponent } from './components/courses/trainer-courses/trainer-courses.component';
import { AddCourseComponent } from './components/courses/add-course/add-course.component';
import { CourseSummaryComponent } from './components/courses/course-summary/course-summary.component';
import { GalleryComponent } from './components/media/gallery/gallery.component';
import { AddItemsComponent } from './components/courses/add-items/add-items.component';
import { StepsManagementComponent } from './components/courses/steps-management/steps-management.component';
import { UploadComponent } from './components/media/upload/upload.component';
import { AuthTrainer } from '../_helpers/auth.trainer';
import { CorrectionIndexComponent } from './components/corrections/correction-index/correction-index.component';
import { CourseCorrectionsStudentsComponent } from './components/corrections/course-corrections-students/course-corrections-students.component';
import { StudentCorrectionsComponent } from './components/corrections/student-corrections/student-corrections.component';
import { AddCourseMainComponent } from './components/courses/add-course-main/add-course-main.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { ReportComponent } from './components/reports/report/report.component';
import { QuarterReportComponent } from './components/reports/quarter-report/quarter-report.component';
import { TrainerProfileSetupComponent } from '../shared/components/trainer/trainer-profile-setup/trainer-profile-setup.component';
import { TrainerProfileComponent } from '../shared/components/trainer/trainer-profile/trainer-profile.component';
import { UploadMediaComponent } from './components/media/upload-media/upload-media.component';
import { ShowGalleryComponent } from './components/media/show-gallery/show-gallery.component';

const routesold: Routes = [
  {
    path: '',
    component: TrainerComponent,
    children: [


      {
        path: 'courses',
        component: TrainerCoursesComponent,
        children: [{
          path: 'list',
          component: TrainerCoursesComponent
        },
        {
          path: 'addyy/:id',
          component: AddCourseComponent
        },
        ]
      },
      {
        path: 'courses/view/:courseId',
        component: CourseSummaryComponent
      },

      {
        path: 'courses/test/:id',
        component: AddCourseComponent
      },

      {
        path: 'upload',
        component: UploadComponent
        // , canActivate: [AuthTrainer]
      },
      {  
        path: 'upload-media',
        component: UploadMediaComponent
      },
      {  
        path: 'view-gallery',
        component: ShowGalleryComponent
      },

      {
        path: 'courses/edit/:courseId',
        component: AddCourseComponent
      },
      {
        path: 'courses/media-gallery',
        component: GalleryComponent
      },
      {
        path: 'courses/add-item',
        component: AddItemsComponent
      },
      {
        path: 'courses/steps',
        component: StepsManagementComponent
      },
      {
        path: 'currentYearReport',
        component: ReportComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'currentYearReport/:from/:to',
        component: ReportComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'quarter-report',
        component: QuarterReportComponent

      },





    ]

  }];

const routes: Routes = [
  {
    path: '',
    component: TrainerComponent,
    children: [
      {
        path: '',
        component: DashboardComponent

      },


      ///

      {
        path: 'courses',
        component: TrainerCoursesComponent

      },

      {
        path: 'addCourseLayout',
        component: AddCourseMainComponent,
        children: [{
          path: 'courses/view/:courseId',
          component: AddCourseMainComponent
        }
        ]


      },

      {
        path: 'corrections/:courseId/students',
        component: CourseCorrectionsStudentsComponent
      },

      {
        path: 'corrections/:courseId/student/:studentId/answers',
        component: StudentCorrectionsComponent
      },

      {
        path: 'corrections',
        component: CorrectionIndexComponent,
        children: [
          {
            path: 'list',
            component: CorrectionIndexComponent
          },

          {
            path: 'students1/:courseId',
            component: CourseCorrectionsStudentsComponent
          },



        ]
      },

      {
        path: 'update-profile/:id/:name',
        component: TrainerProfileSetupComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'profile/:id',
        component: TrainerProfileComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'upload',
        component: UploadComponent
        // , canActivate: [AuthTrainer]
      },
      {  
        path: 'upload-media',
        component: UploadMediaComponent
      },
      {  
        path: 'view-gallery',
        component: ShowGalleryComponent
      },

      ///
      {
        path: 'courses',
        component: TrainerCoursesComponent
      },
      {
        path: 'courses/new',
        component: AddCourseMainComponent
      },
      {
        path: 'courses/:courseId/items/:itemId/edit',
        component: AddCourseMainComponent
      },
      {
        path: 'courses/:courseId/edit',
        component: AddCourseMainComponent
      },
      {
        path: 'courses/:courseId',
        component: CourseSummaryComponent
      },
      {
        path: 'corrections',
        component: CorrectionIndexComponent
      },
      {
        path: 'currentYearReport',
        component: ReportComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'currentYearReport/:from/:to',
        component: ReportComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'quarter-report',
        component: QuarterReportComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
