import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerHeaderComponent implements OnInit {
  langStyle: any;

  constructor(
    public app_ser: AppService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public router: Router
  ) { 
    this.langStyle = "wrapper-trainer-header-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }
  usrImg() {
    let user = this.app_ser.getCurrentUser();
    if (user.image) {
      return this.app_ser.img_url(user.image, 'user')
    }
    if (user.image_url) {
      return user.image_url;
    }
    return this.app_ser.img_url(user.image, 'user')

  }
  logout() {
    this.app_ser.logout();
    this.router.navigate(["/"]);
  }
}
