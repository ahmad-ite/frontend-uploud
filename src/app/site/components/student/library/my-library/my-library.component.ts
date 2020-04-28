import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../../services/dialog.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VgAPI } from 'videogular2/compiled/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import { TabsModule, TabsetComponent } from 'ng-uikit-pro-standard'
import { Location } from '@angular/common';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyLibraryComponent implements OnInit {

  langStyle: any;
  currentOrientation = 'vertical';
  activeTab: string;
  constructor(
    public dialogService: DialogService,
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService,
    private location: Location,

  ) {
    this.langStyle = "wrapper-my-library-" + app_ser.app_lang();
    let mode = this.route.snapshot.params['mode'];
    this.activeTab = mode ? mode : "my-courses";

  }

  ngOnInit() {

  }

  onTabChange($event: NgbTabChangeEvent) {
    this.activeTab = "";

    this.location.go("my-library/" + $event.nextId);
    this.activeTab = $event.nextId;
  }


}


