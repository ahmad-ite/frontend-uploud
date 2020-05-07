import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-trainer-navigation',
  templateUrl: './trainer-navigation.component.html',
  styleUrls: ['./trainer-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerNavigationComponent implements OnInit {
  langStyle: any;


  constructor(
    public app_ser: AppService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    public router: Router,
    private translate: TranslateService
  ) {
    this.langStyle = "wrapper-trainer-sidebar-" + this.app_ser.app_lang();

  }

  ngOnInit() {
  }
  logout() {
    // alert("11");
    this.app_ser.logout();
    this.router.navigate(["/"]);
  }



}

