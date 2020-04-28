import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
// import { Item1Component } from './componenets/item1/item1.component';
// import { Item2Component } from './componenets/item2/item2.component';
// import { MetafrenzyModule, MetafrenzyGuard } from 'ngx-metafrenzy';
// import { Home1Component } from './componenets/home1/home1.component';
import { environment } from '../environments/environment';

// import { AuthGuard } from './_helpers/auth.guard';
// import { AuthStudent } from './_helpers/auth.student';
// import { AuthTrainer } from './_helpers/auth.trainer';
/**Componenets */
// import { LoginComponent } from './login/login.component';
// import { LoginComponent } from './login/da.component';
// import { DashboardComponent } from './componenets/login/dashboard/dashboard.component';
// import { RegisterComponent } from './register/register.component';
// import { HomeComponent } from './home/home.component';
// import { HomeComponent } from './components/home/home.component';
// import { TrainerViewComponent } from './components/trainer/trainer-view/trainer-view.component';
// import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { CourseInsideComponent } from './components/student/course-inside/course-inside.component';
// import { MyCoursesComponent } from './components/student/my-courses/my-courses.component';
// import { MyCourseDetailsComponent } from './components/student/my-course-details/my-course-details.component';
// import { StepsComponent } from './components/student/steps/steps.component';
// import { CompletedCoursesComponent } from './components/student/completed-courses/completed-courses.component';

// import { HomePageComponent } from './components/home-page/home-page.component';

// import { ModuleWithProviders } from "@angular/core";


// import { UploadComponent } from './components/upload/upload.component';
// import { UploaderComponent } from './components/uploader/uploader.component';
// import { CategoryCoursesComponent } from './components/category-courses/category-courses.component';
// import { MyLibraryComponent } from './components/my-library/my-library.component';

// import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
// import { ProfileComponent } from './components/student/profile/profile.component';
// import { TrainerSignupComponent } from './components/trainer/trainer-signup/trainer-signup.component';
// import { TrainerProfileSetupComponent } from './components/trainer/trainer-profile-setup/trainer-profile-setup.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { SearchResultComponent } from './components/search-result/search-result.component';
// import { TrainerProfileComponent } from './components/trainer/trainer-profile/trainer-profile.component';
// import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
// // import { TrainerCoursesComponent } from './components/trainer/courses/trainer-courses/trainer-courses.component';
// import { AddCourseComponent } from './components/trainer/courses/add-course/add-course.component';
// import { TestAComponent } from './components/trainer/test-a/test-a.component';

// import { CourseSummaryComponent } from './components/trainer/courses/course-summary/course-summary.component';
// import { AddItemsComponent } from './components/trainer/courses/add-items/add-items.component';
// import { GalleryComponent } from './components/trainer/gallery/gallery.component';

// import { TestComponent } from './components/test/test/test.component';



// const redirect = "/ang8/";
const routes: Routes = [

  // {
  //   path: 'courses',
  //   component: TrainerCoursesComponent,
  //   outlet: 'trainer',
  //   // children: [
  //   //   {
  //   //     path:'add-course1',
  //   //     component:AddCourseComponent,
  //   //     outlet: 'trainer'
  //   //   }
  //   // ]
  // },
  // {
  //   path: 'add-course',
  //   component: AddCourseComponent,
  //   outlet: 'trainer'
  // },

  // {
  //   path: 'view-course-summary',
  //   component: CourseSummaryComponent,
  //   outlet: 'trainer'
  // },
  // {
  //   path: 'add-items',
  //   component: AddItemsComponent,
  //   outlet: 'trainer'
  // },
  // {
  //   path: 'gallery',
  //   component: GalleryComponent,
  //   outlet: 'trainer'
  // },
  // {
  //   path: 'maani',
  //   component: TestAComponent,
  //   outlet: 'trainer'
  // },

  // //all start
  // // {
  // //   path: '',
  // //   component: IndexPageComponent
  // // },


  // // {
  // //   path: '',
  // //   loadChildren: () => import('./all/all.module').then(m => m.AllModule)
  // // },
  {
    path: '',
    loadChildren: () => import('./site/site.module').then(m => m.SiteModule)
  },
  {
    // path: 'trainerPanel',
    path: 'trainer',
    loadChildren: () => import('./trainer/trainer.module').then(m => m.TrainerModule)
  },

  // // {
  // //   path: 'course-category/:catId/:catName',
  // //   component: IndexPageComponent
  // // },
  // {
  //   path: 'search/:query',
  //   component: SearchResultComponent
  // },

  // {
  //   path: 'sineup',
  //   component: SignUpComponent
  // },
  // {
  //   path: 'terms&conditions',
  //   component: TermsAndConditionsComponent
  // },

  // {
  //   path: 'course-category/:tempId/:catId/:tempName/:catName',
  //   component: CategoryCoursesComponent
  // },
  // // {
  // //   path: 'home-new-old',
  // //   component: HomeComponent
  // // },

  // {
  //   path: 'trainer-view/:id',
  //   component: TrainerViewComponent
  // },
  // {
  //   path: 'course-view/:code/:name',
  //   component: CourseDetailComponent
  // },

  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // },
  // {
  //   path: 'course-inside/:regId',
  //   component: CourseInsideComponent
  // },
  // // {
  // //   path: 'my-course/:regId',
  // //   component: MyCourseDetailsComponent
  // // }
  // // ,

  // // {
  // //   path: 'Dashboard',
  // //   component: DashboardComponent,
  // //   data: {
  // //     title: 'Dashboard Page'
  // //   }
  // // },

  // // {
  // //   path: 'login1',
  // //   component: LoginComponent
  // // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // // {
  // //   path: 'my-courses',
  // //   component: MyCoursesComponent
  // // },

  // // {
  // //   path: 'completed-courses',
  // //   component: CompletedCoursesComponent
  // // },

  // {
  //   path: 'uploader',
  //   component: UploaderComponent
  // },

  // {
  //   path: 'test',
  //   component: TestComponent
  // },


  // //all end

  // //student Auth start
  // {
  //   path: 'my-library/:mode',
  //   component: MyLibraryComponent
  //   , canActivate: [AuthStudent]
  // },

  // {
  //   path: 'steps/:regId/:name',
  //   component: StepsComponent
  //   // , canActivate: [AuthStudent]

  // },
  // {
  //   path: 'student/:id/:name',
  //   component: ProfileComponent
  //   , canActivate: [AuthStudent]
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent
  //   , canActivate: [AuthStudent]
  // },
  // //student Auth end

  // //Trainer Auth start

  // {
  //   path: 'trainer111',
  //   component: TestAComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: TestAComponent
  //       , canActivate: [AuthTrainer]
  //     },

  //     {
  //       path: 'upload',
  //       component: UploadComponent
  //       , canActivate: [AuthTrainer]
  //     }
  //   ]
  // },
  // {
  //   path: 'update-profile/:id/:name',
  //   component: TrainerProfileSetupComponent
  //   , canActivate: [AuthTrainer]
  // },
  // {
  //   path: 'profile/:id/:name',
  //   component: TrainerProfileComponent
  //   , canActivate: [AuthTrainer]
  // },

  // {
  //   path: 'upload',
  //   component: UploadComponent
  //   , canActivate: [AuthTrainer]
  // },
  // {
  //   path: 'abdul',
  //   component: MainLayoutComponent,
  //   outlet: "trainer"
  //   // canActivate: [AuthTrainer]

  // },
  //Trainer Auth end

  // { path: 'item1', component: Item1Component, canActivate: [AuthStudent] },
  // { path: 'item2', component: Item2Component, canActivate: [AuthTrainer] },
  { path: '**', redirectTo: '' },


];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload', useHash: true })],
    RouterModule.forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



