import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';

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
    private translate: TranslateService
  ) { 
    this.langStyle = "wrapper-trainer-header-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}
