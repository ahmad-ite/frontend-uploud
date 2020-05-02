import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site.component';
import { IndexPageComponent } from './components/home/index-page/index-page.component';
import { AuthStudent } from '../_helpers/auth.student';
import { ProfileComponent } from './components/student/profile/profile/profile.component';
import { CourseDetailComponent } from './components/home/course-detail/course-detail.component';
import { TrainerViewComponent } from './components/trainer/trainer-view/trainer-view.component';
import { MyLibraryComponent } from './components/student/library/my-library/my-library.component';
import { StepsComponent } from './components/student/steps/steps.component';

import { SearchResultComponent } from './components/home/search-result/search-result.component';
import { TrainerProfileSetupComponent } from '../shared/components/trainer/trainer-profile-setup/trainer-profile-setup.component';
import { TrainerProfileComponent } from '../shared/components/trainer/trainer-profile/trainer-profile.component';
import { RecordComponent } from './components/test/record/record.component';
import { IndexDubaiClubComponent } from './components/home/index-dubai-club/index-dubai-club.component';
import { ContactUsComponent } from './components/home/contact-us/contact-us.component';
import { AboutComponent } from './components/home/about/about.component';
import { TermsAndConditionsComponent } from './components/home/terms-and-conditions/terms-and-conditions.component';
import { CategoryCoursesComponent } from './components/home/category-courses/category-courses.component';
import { StepsSummaryComponent } from './components/student/steps-summary/steps-summary.component';
import { PaymentComponent } from './components/modals/payment/payment.component';
import { TestOutLinkComponent } from './components/test/test-out-link/test-out-link.component';
import { SuccessComponent } from './components/mobile_payment/success/success.component';
import { FailureComponent } from './components/mobile_payment/failure/failure.component';
import { MobilePaymentComponent } from './components/mobile_payment/mobile-payment/mobile-payment.component';
import { RedirectComponent } from './components/test/redirect/redirect.component';
import { RedirectPageComponent } from './components/mobile_payment/redirect-page/redirect-page.component';
import { BlogsListComponent } from './components/blog/blogs-list/blogs-list.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';




const routes: Routes = [

  {

    path: '', component: SiteComponent,

    children: [
      {
        path: '',
        component: IndexPageComponent
      },


      {
        path: 'free/:courseCode/:courseName',
        component: StepsSummaryComponent
      },
      {
        path: 'index-dubai-club',
        component: IndexDubaiClubComponent
      },
      // {
      //   path: 'payment',
      //   component: PaymentComponent
      // },
      {
        path: 'contact',
        component: ContactUsComponent

      },
      {
        path: 'about',
        component: AboutComponent

      },

      {
        path: 'template/:tempId/:name',
        component: CategoryCoursesComponent

      },
      {
        path: 'terms',
        component: TermsAndConditionsComponent
      },
      {
        path: 'blogs-list',
        component: BlogsListComponent
      },
      {
        path: 'blog-detail',
        component: BlogDetailComponent
      },
      {
        path: 'course-category/:catId/:catName',
        component: IndexPageComponent
      },


      {
        path: 'record',
        component: RecordComponent
      },

      // {
      //   path: 'course-category/:catId/:catName',
      //   component: IndexDubaiClubComponent
      // },
      {
        path: 'payment',
        component: TestOutLinkComponent
      },
      {
        path: 'pay/:courseId/:token',
        component: MobilePaymentComponent
      },

      {
        path: 'payment/success/:Id',
        component: SuccessComponent
      },

      {
        path: 'payment/loading',
        component: RedirectPageComponent
      },

      {
        path: 'payment/failure',
        component: FailureComponent
      },
      {
        path: 'course-view/:code/:name',
        component: CourseDetailComponent
      },
      {
        path: 'search/:query',
        component: SearchResultComponent
      },

      {
        path: 'trainer-view/:id',
        component: TrainerViewComponent
      },

      {
        path: 'my-profile/:id/:name',
        component: ProfileComponent
        // , canActivate: [AuthStudent]
      },

      {
        path: 'my-library/:mode',
        component: MyLibraryComponent
        // , canActivate: [AuthStudent]
      },

      {
        path: 'steps/:regId/:name',
        component: StepsComponent
        // , canActivate: [AuthStudent]

      },
      {
        path: 'redirect/:ref',
        component: RedirectComponent
      },

      {
        path: 'update-profile/:id/:name',
        component: TrainerProfileSetupComponent
        // , canActivate: [AuthTrainer]
      },
      {
        path: 'profile/:id/:name',
        component: TrainerProfileComponent
        // , canActivate: [AuthTrainer]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
