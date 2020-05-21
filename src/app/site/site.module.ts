import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { NgMarqueeModule } from 'ng-marquee';

import {
  MDBSpinningPreloader
  , TabsetComponent
  , WavesDirective
  , MDBBootstrapModulesPro

} from 'ng-uikit-pro-standard';

import { socialConfigs, HttpLoaderFactory } from '../app.module';

import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { NgxUploaderModule } from 'ngx-uploader';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IndexPageComponent } from './components/home/index-page/index-page.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { CourseLoaderComponent } from './components/utils/course-loader/course-loader.component';
import { HeaderComponent } from './components/include/header/header.component';
import { FooterComponent } from './components/include/footer/footer.component';


import { SharedModule } from '../shared/SharedModule';
import { StepsComponent } from './components/student/steps/steps.component';

import { SearchComponent } from './components/modals/search/search.component';

import { ProfileComponent } from './components/student/profile/profile/profile.component';
import { CourseDetailComponent } from './components/home/course-detail/course-detail.component';
import { TrainerViewComponent } from './components/trainer/trainer-view/trainer-view.component';
import { MyLibraryComponent } from './components/student/library/my-library/my-library.component';
import { CertificatesComponent } from './components/student/library/certificates/certificates.component';
import { WishlistComponent } from './components/student/library/wishlist/wishlist.component';
import { MyCoursesComponent } from './components/student/library/my-courses/my-courses.component';
import { CompletedCoursesComponent } from './components/student/library/completed-courses/completed-courses.component';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CountdownModule } from 'ngx-countdown';
import { SearchResultComponent } from './components/home/search-result/search-result.component';

import { IndexDubaiClubComponent } from './components/home/index-dubai-club/index-dubai-club.component';

import { NavigationComponent } from './components/include/navigation/navigation.component';
import { CategoryCoursesComponent } from './components/home/category-courses/category-courses.component';

import { RecordComponent } from './components/test/record/record.component';
import { HeaderDubaiClubComponent } from './components/include/header-dubai-club/header-dubai-club.component';
import { ContactUsComponent } from './components/home/contact-us/contact-us.component';
import { AboutComponent } from './components/home/about/about.component';
import { TermsAndConditionsComponent } from './components/home/terms-and-conditions/terms-and-conditions.component';
import { StepsSummaryComponent } from './components/student/steps-summary/steps-summary.component';
import { PaymentComponent } from './components/modals/payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { TestOutLinkComponent } from './components/test/test-out-link/test-out-link.component';
import { SuccessComponent } from './components/mobile_payment/success/success.component';
import { FailureComponent } from './components/mobile_payment/failure/failure.component';
import { MobilePaymentComponent } from './components/mobile_payment/mobile-payment/mobile-payment.component';

import { DownloadAppPopupComponent } from './components/home/download-app-popup/download-app-popup.component';

import { RedirectComponent } from './components/test/redirect/redirect.component';
import { RedirectPageComponent } from './components/mobile_payment/redirect-page/redirect-page.component';
import { OffersComponent } from './components/include/offers/offers.component';
import { BlogsListComponent } from './components/blog/blogs-list/blogs-list.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';

import { JobsComponent } from './components/home/jobs/jobs.component';
import { KunCertificatesComponent } from './components/home/kun-certificates/kun-certificates.component';

import { TestComponent } from './components/test/test/test.component';
import { PublisherComponent } from './components/student/stream/publisher/publisher.component';
import { SubscriberComponent } from './components/student/stream/subscriber/subscriber.component';
import { TestStreamComponent } from './components/student/stream/test-stream/test-stream.component';
import { LiveStreamingComponent } from './components/live/live-streaming/live-streaming.component';





@NgModule({
  declarations: [
    SiteComponent,
    IndexPageComponent,
    CourseLoaderComponent,
    CourseDetailComponent,
    TrainerViewComponent,
    // PagenationComponent,
    //student library
    MyLibraryComponent,

    CertificatesComponent,
    MyCoursesComponent,
    CompletedCoursesComponent,
    WishlistComponent,


    // include
    NavigationComponent,
    HeaderComponent,
    FooterComponent
    ,



    CategoryCoursesComponent,

    ///
    TermsAndConditionsComponent,

    StepsComponent,

    SearchComponent,

    ProfileComponent,

    SearchResultComponent,

    RecordComponent,
    IndexDubaiClubComponent,

    HeaderDubaiClubComponent,

    ContactUsComponent,

    AboutComponent,

    StepsSummaryComponent,

    PaymentComponent,

    TestOutLinkComponent,

    SuccessComponent,

    FailureComponent,

    MobilePaymentComponent,
    BlogDetailComponent,

    DownloadAppPopupComponent,

    RedirectComponent,

    RedirectPageComponent,

    OffersComponent,
    BlogsListComponent,

    JobsComponent,
    KunCertificatesComponent,

    TestComponent,

    PublisherComponent,

    SubscriberComponent,

    TestStreamComponent,

    LiveStreamingComponent,




  ],
  imports: [

    CommonModule,
    NgMarqueeModule,
    NgxPayPalModule,
    SiteRoutingModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,

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
    CountdownModule,
  ],
  exports: [

  ],
  entryComponents: [


  ]
  ,
  providers: [

    // NgbActiveModal,

    MDBSpinningPreloader,

  ]

})
export class SiteModule { }
