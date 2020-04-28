import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenationComponent } from './components/utils/pagenation/pagenation.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TrainerProfileComponent } from './components/trainer/trainer-profile/trainer-profile.component';
import { TrainerProfileSetupComponent } from './components/trainer/trainer-profile-setup/trainer-profile-setup.component';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgCoreModule } from 'videogular2/compiled/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
// import { SignupTypeComponent } from '../components/signup-type/signup-type.component';

@NgModule({

  declarations: [
    PagenationComponent,
    TrainerProfileComponent,
    TrainerProfileSetupComponent,
    // SignupTypeComponent,
    // ConfirmationDialogService

  ],
  exports: [
    CommonModule, FormsModule,
    PagenationComponent,
    TrainerProfileComponent,
    TrainerProfileSetupComponent
    // ConfirmationDialogService
    // SignupTypeComponent

  ],
  imports: [
    // BrowserModule,
    FormsModule,
    NgbModule,
    CommonModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgCoreModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    DragDropModule,
    MDBBootstrapModulesPro.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        // useClass: CustomTranslateLoader,
        deps: [HttpClient]
      },


      isolate: false
    }),],


  providers: [
    NgbActiveModal
  ],

  entryComponents: [

    // SignupTypeComponent
  ]
})
export class SharedModule { }
