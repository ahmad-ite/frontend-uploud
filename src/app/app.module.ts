import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { Globals } from './globals';
import { AppComponent } from './app.component';


import { MetafrenzyModule, MetafrenzyGuard } from 'ngx-metafrenzy';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MDBBootstrapModulesPro, TabsetComponent, WavesDirective } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { NgxUploaderModule } from 'ngx-uploader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PdfViewerModule } from 'ng2-pdf-viewer';



import { NgxPayPalModule } from 'ngx-paypal';

import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';



import { ReactiveFormsModule } from '@angular/forms';



import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';


import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule

} from '@angular/material';

import { NgxFileDropModule } from 'ngx-file-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import { TestComponent } from './components/test/test.component';
import { ShowVideoComponent } from './components/show-video/show-video.component';
// import { TestComponent } from './components/test/test/test.component';



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

    TestComponent,

    ShowVideoComponent,





  ],
  imports: [

    MatRadioModule,
    NgxPayPalModule,
    MatCheckboxModule,
    CloudflareStreamModule,
    NgxUploaderModule,
    MatInputModule,
    Ng2TelInputModule,
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

    // HeaderComponent,
    MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatPseudoCheckboxModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule

  ],
  entryComponents: [
    ShowVideoComponent

  ]
  ,
  providers: [



    AuthService,
    MDBSpinningPreloader,




    {
      provide: AuthServiceConfig,

    },


    Globals,


  ],
  bootstrap: [AppComponent]
})


export class AppModule {


}




