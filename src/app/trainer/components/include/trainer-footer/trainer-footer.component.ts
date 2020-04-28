import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainer-footer',
  templateUrl: './trainer-footer.component.html',
  styleUrls: ['./trainer-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerFooterComponent implements OnInit {
  langStyle: string;

  constructor(
    public app_ser: AppService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { 
    this.langStyle = "wrapper-trainer-footer-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}
