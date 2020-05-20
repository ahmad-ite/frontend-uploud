import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AppRoutingModule } from './app-routing.module';

// import { RouteReuseStrategy } from '@angular/router';
import { Globals } from './globals';
import { AppComponent } from './app.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { Item1Component } from './componenets/item1/item1.component';
import { Item2Component } from './componenets/item2/item2.component';
import { MetafrenzyModule, MetafrenzyGuard } from 'ngx-metafrenzy';
// import { Home1Component } from './componenets/home1/home1.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MDBBootstrapModulesPro, TabsetComponent, WavesDirective } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
// import { MatVideoModule } from 'mat-video';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxUploaderModule } from 'ngx-uploader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { ImageUploaderModule } from 'ngx-image-uploader';
// import { CountdownModule } from 'ngx-countdown';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewPdfComponent } from './shared/modals/view-pdf/view-pdf.component';


import { NgxPayPalModule } from 'ngx-paypal';

import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';



import { ReactiveFormsModule } from '@angular/forms';


// // services
import { InterceptorService } from './_services/interceptor.service';
import { UserService } from './_services/user.service';
import { DataService } from './_services/data.service';
// import { CustomTranslateLoader } from './_services/CustomTranslateLoader.service';
import { AppService } from './services/app.service';

import { ConfirmationDialogComponent } from './shared/modals/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/modals/confirmation-dialog/confirmation-dialog.service'


// import { RegisterComponent } from './register/register.component';
// import { Home2Component } from './home/home2.component';
// import { Dashboard1Component } from './componenets/login/dashboard/dashboard1.component';
// import { HeaderComponent } from './components/header/header.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { HomeComponent } from './components/home/home.component';
// import { TrainerViewComponent } from './components/trainer/trainer-view/trainer-view.component';
// import { CourseDetailComponent } from './components/courses/course-detail/course-detail.component';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { SignInComponent } from './site/components/registration/sign-in/sign-in.component';
import { DialogService } from '../app/services/dialog.service';
// import * as $ from 'jquery';
import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule

} from '@angular/material';

// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { CourseInsideComponent } from './components/student/course-inside/course-inside.component';
// import { MyCoursesComponent } from './components/student/my-courses/my-courses.component';
// import { CompletedCoursesComponent } from './components/student/completed-courses/completed-courses.component';
// import { WishlistComponent } from './components/student/wishlist/wishlist.component';
// import { CertificatesComponent } from './components/certificates/certificates.component';
// import { MyCourseDetailsComponent } from './components/student/my-course-details/my-course-details.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

// import { ResultComponent } from './components/student/result/result.component';
// import { StepsComponent } from './components/student/steps/steps.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SignupTypeComponent } from './site/components/registration/signup-type/signup-type.component';
import { SignUpComponent } from './site/components/registration/sign-up/sign-up.component';
import { TrainerSignupComponent } from './site/components/registration/trainer-signup/trainer-signup.component';
import { SharedModule } from './shared/SharedModule';

// import { BotDetectCaptchaModule } from 'angular-captcha';

// import { HomePageComponent } from './components/home-page/home-page.component';
// import { NavigationComponent } from './components/navigation/navigation.component';
// import { SearchComponent } from './components/search/search.component';

// import { UploadComponent } from './components/upload/upload.component';
// import { UploaderComponent } from './components/uploader/uploader.component';
// import { CategoryCoursesComponent } from './components/category-courses/category-courses.component';
// import { MyLibraryComponent } from './components/my-library/my-library.component';


// // import { HomepageComponent } from './components/homepage/homepage.component';
// import { IndexPageComponent } from './components/index-page/index-page.component';
// import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
// import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
// import { ProfileComponent } from './components/student/profile/profile.component';
// import { SignupTypeComponent } from './components/signup-type/signup-type.component';
// import { TrainerSignupComponent } from './components/trainer/trainer-signup/trainer-signup.component';
// import { TrainerProfileSetupComponent } from './components/trainer/trainer-profile-setup/trainer-profile-setup.component';
// import { SearchResultComponent } from './components/search-result/search-result.component';
// import { PagenationComponent } from './components/utils/pagenation/pagenation.component';
// import { TrainerProfileComponent } from './components/trainer/trainer-profile/trainer-profile.component';
import { InputsCertificatComponent } from './site/components/modals/inputs-certificat/inputs-certificat.component';
import { SetPasswordFormComponent } from './site/components/modals/set-password-form/set-password-form.component';
import { ResetFormComponent } from './site/components/modals/reset-form/reset-form.component';
import { TermsAndConditionsComponent } from './site/components/modals/terms-and-conditions/terms-and-conditions.component';
import { GalleryPopupComponent } from './trainer/components/modals/gallery-popup/gallery-popup.component';
// import { UploadComponent } from './trainer/components/media/upload/upload.component';
import { VideoDetailPopupComponent } from './trainer/components/modals/video-detail-popup/video-detail-popup.component';
import { EmailAuthenticationComponent } from './site/components/modals/email-authentication/email-authentication.component';
import { UpdateProfileComponent } from './site/components/student/update-profile/update-profile.component';
import { PaymentGatewayComponent } from './site/components/modals/payment-gateway/payment-gateway.component';
import { InvoiceComponent } from './site/components/student/invoice/invoice.component';
import { GalleryItemPreviewComponent } from './trainer/components/modals/gallery-item-preview/gallery-item-preview.component';
import { UploadGalleryPopupComponent } from './trainer/components/modals/upload-gallery-popup/upload-gallery-popup.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

// import { SearchComponent } from './site/components/modals/search/search.component';
// import { CourseLoaderComponent } from './components/utils/course-loader/course-loader.component';
// import { ResetFormComponent } from './components/modals/resetPassword/reset-form/reset-form.component';
// import { SetPasswordFormComponent } from './components/modals/resetPassword/set-password-form/set-password-form.component';
// import { TestAComponent } from './components/trainer/test-a/test-a.component';
// import { TrainerHeaderComponent } from './components/trainer/trainer-main-layout/trainer-header/trainer-header.component';
// import { TrainerFooterComponent } from './components/trainer/trainer-main-layout/trainer-footer/trainer-footer.component';
// import { TrainerNavigationComponent } from './components/trainer/trainer-main-layout/trainer-navigation/trainer-navigation.component';

// import { AddCourseComponent } from './components/trainer/courses/add-course/add-course.component';
// import { CourseSummaryComponent } from './components/trainer/courses/course-summary/course-summary.component';
// import { AddItemsComponent } from './components/trainer/courses/add-items/add-items.component';
// import { GalleryComponent } from './components/trainer/gallery/gallery.component';
// import { MediaUploadComponent } from './components/trainer/modals/media-upload/media-upload.component';


// import { TestComponent } from './components/test/test/test.component';
export function socialConfigs() {

  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        // provider: new FacebookLoginProvider('396337467909238')
        provider: new FacebookLoginProvider('1098037233871928')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        // provider: new GoogleLoginProvider('660160017602-glg4c28hmqa3ih0e6vl1b1nntbt19qnn.apps.googleusercontent.com')
        provider: new GoogleLoginProvider('244640450562-002ds5sv97m26a50tfbc2lfub9cak60n.apps.googleusercontent.com')

      }
    ]
  );
  return config;
}


export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);


  return new TranslateHttpLoader(
    http
    , 'local/i18n/', // or whatever path you're using
    '.json'
  );
}
@NgModule({
  declarations: [

    AppComponent,
    // JwPaginationComponent,

    // RegisterComponent,
    // HomeComponent,
    // NavbarComponent,
    Item1Component,
    Item2Component,
    // Home1Component,
    // Home2Component,
    // DashboardComponent,
    // Dashboard1Component,
    // HeaderComponent,
    // FooterComponent,

    // TrainerViewComponent,
    // CourseDetailComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmationDialogComponent,
    // CourseInsideComponent,
    // MyCoursesComponent,
    // MyCourseDetailsComponent,
    // ResultComponent,
    // StepsComponent,
    // CompletedCoursesComponent,
    // HomePageComponent,
    // NavigationComponent,
    // SearchComponent,
    // UploadComponent,
    // UploaderComponent,
    // CategoryCoursesComponent,
    // MyLibraryComponent,
    // WishlistComponent,
    // CertificatesComponent,
    // IndexPageComponent,
    // MainNavigationComponent,
    TermsAndConditionsComponent,
    // ProfileComponent,
    SignupTypeComponent,
    TrainerSignupComponent,
    // SearchResultComponent,
    // PagenationComponent,
    // TrainerProfileSetupComponent,
    ViewPdfComponent,
    // SearchResultComponent,
    // TrainerProfileComponent,
    InputsCertificatComponent,
    EmailAuthenticationComponent,
    // CourseLoaderComponent,
    ResetFormComponent,
    SetPasswordFormComponent,
    // TestAComponent,
    // TrainerHeaderComponent,
    // TrainerFooterComponent,
    // TrainerNavigationComponent,


    // AddCourseComponent,
    // CourseSummaryComponent,
    // AddItemsComponent,
    // GalleryComponent,
    // MediaUploadComponent,
    VideoDetailPopupComponent,
    GalleryPopupComponent,

    // TestComponent
    UpdateProfileComponent,
    PaymentGatewayComponent,
    InvoiceComponent,
    GalleryItemPreviewComponent,
    UploadGalleryPopupComponent

  ],
  imports: [
    SharedModule,
    MatRadioModule,
    NgxPayPalModule,
    MatCheckboxModule,
    NgxUploaderModule,
    MatInputModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,

    // BotDetectCaptchaModule,mdb
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    VgCoreModule,

    NgbModule,
    VgControlsModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    // MatVideoModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    // ImageUploaderModule,
    BrowserModule,
    FormsModule,
    PdfViewerModule,
    // CountdownModule,

    MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
    NgxFileDropModule,
    DragDropModule,
    MetafrenzyModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AppRoutingModule,
    NgxUiLoaderModule,
    NgFlashMessagesModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     // useClass: CustomTranslateLoader,
    //     deps: [HttpClient]
    //   },
    //   isolate: false

    // }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        // useClass: CustomTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false

    }),
    // // Specify ng-circle-progress as an import
    // NgCircleProgressModule.forRoot({
    //   // set defaults here
    //   radius: 10,
    //   outerStrokeWidth: 16,
    //   innerStrokeWidth: 8,
    //   outerStrokeColor: "#78C000",
    //   innerStrokeColor: "#C7E596",
    //   animationDuration: 300,

    // })

  ],
  exports: [
    SignInComponent,
    InputsCertificatComponent,
    EmailAuthenticationComponent,
    GalleryPopupComponent,
    VideoDetailPopupComponent,
    // HeaderComponent,
    MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule

  ],
  entryComponents: [
    SignInComponent,
    GalleryPopupComponent,
    InputsCertificatComponent,
    SignUpComponent,
    ConfirmationDialogComponent,
    EmailAuthenticationComponent,
    // ResultComponent,
    TermsAndConditionsComponent,
    SignupTypeComponent,
    TrainerSignupComponent,
    ViewPdfComponent,
    ResetFormComponent,
    SetPasswordFormComponent,
    GalleryPopupComponent,
    // MediaUploadComponent,
    VideoDetailPopupComponent,
    UpdateProfileComponent,
    PaymentGatewayComponent,
    InvoiceComponent,
    GalleryItemPreviewComponent,
    UploadGalleryPopupComponent

  ]
  ,
  providers: [
    DialogService,
    DataService,
    // NgbActiveModal,
    AuthService,
    MDBSpinningPreloader,
    ConfirmationDialogService,

    // TabsetComponent,
    // WavesDirective,

    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    },
    // CustomTranslateLoader,
    UserService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    Globals,
    AppService,

  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  // platformBrowserDynamic().bootstrapModule(AppModule);

}

// platformBrowserDynamic().bootstrapModule(AppModule);


